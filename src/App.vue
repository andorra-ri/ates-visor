<template>
  <Map />
  <Toolbar />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { Map, Toolbar } from '/@/layouts';
import store from '/@/store';

onMounted(() => {
  store.loadTerrain();
  store.loadRoutes();
});
</script>
