<template>
  <div id="map" />
</template>

<script setup lang="ts">
import { computed, watchEffect, onMounted } from 'vue';
import { createMap, useMap } from '/@/composables';
import store from '/@/store';
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

addLayer(computed(() => {
  const source = toFeatureCollection(route.value?.waypoints || []);
  return { ...config.layers.WAYPOINTS, source };
}));

watchEffect(() => route.value && fitTo(route.value.trails, { padding: 50 }));

onMounted(() => {
  createMap('map', config.map);
  createLegend(config.map.legend);
});
</script>
