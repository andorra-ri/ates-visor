<template>
  <div id="map" />
  <WaypointModal
    v-if="waypoint"
    :waypoint="waypoint"
    @close="clearWaypoint" />
</template>

<script setup lang="ts">
import { ref, computed, watchEffect, onMounted } from 'vue';
import { createMap, useMap, type MapLayerMouseEvent } from '/@/composables';
import WaypointModal from './WaypointModal.vue';
import store from '/@/store';
import type { Waypoint } from '/@/types';
import config from '/@/config.yaml';

const { terrain, route } = store;

const { addLayer, createLegend, fitTo, toFeatureCollection } = useMap();

addLayer(config.layers.BORDERS);

addLayer(computed(() => {
  const source = toFeatureCollection(terrain.value);
  return { ...config.layers.TERRAIN, source };
}));

addLayer(computed(() => {
  const source = toFeatureCollection(route.value?.trails || []);
  return { ...config.layers.ROUTE, source };
}));

const waypoint = ref<Waypoint>();
const clearWaypoint = () => { waypoint.value = undefined; };
const onClick = ({ features }: MapLayerMouseEvent) => {
  if (!features) return;
  const { geometry, properties } = features[0];
  waypoint.value = { ...properties, geometry } as Waypoint;
};

addLayer(computed(() => {
  const source = toFeatureCollection(route.value?.waypoints || []);
  return { ...config.layers.WAYPOINTS, source, onClick };
}));

watchEffect(() => route.value && fitTo(route.value.trails, { padding: 50 }));

onMounted(() => {
  createMap('map', config.map);
  createLegend(config.map.legend);
});
</script>
