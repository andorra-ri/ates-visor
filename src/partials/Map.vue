<template>
  <div id="map" />
  <WaypointModal
    v-if="waypoint"
    :waypoint="waypoint"
    @close="clearWaypoint" />
</template>

<script setup lang="ts">
import { ref, computed, watchEffect, onMounted } from 'vue';
import { createMap, useMap, useLayerAdapter, useTrailsMapper, type MapLayerMouseEvent } from '/@/composables';
import WaypointModal from './WaypointModal.vue';
import store from '/@/store';
import type { Waypoint } from '/@/types';
import config from '/@/config.yaml';

const { terrain, route } = store;

const { addLayer, createLegend, fitTo, toFeatureCollection } = useMap();
const { adaptLayer } = useLayerAdapter();

addLayer(adaptLayer(config.layers.BORDERS));

addLayer(computed(() => {
  const source = toFeatureCollection(terrain.value);
  return adaptLayer({ ...config.layers.TERRAIN, source });
}));

useTrailsMapper(computed(() => route.value?.trails || []));

const waypoint = ref<Waypoint>();
const clearWaypoint = () => { waypoint.value = undefined; };
const onClick = ({ features }: MapLayerMouseEvent) => {
  if (!features) return;
  const { geometry, properties } = features[0];
  waypoint.value = { ...properties, geometry } as Waypoint;
};

addLayer(computed(() => {
  const source = toFeatureCollection(route.value?.waypoints || []);
  return adaptLayer({ ...config.layers.WAYPOINTS, source, onClick });
}));

watchEffect(() => route.value && fitTo(route.value.trails, { padding: 50 }));

onMounted(() => {
  createMap('map', config.map);
  createLegend(config.map.legend);
});
</script>
