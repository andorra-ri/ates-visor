<template>
  <div class="toolbar">
    <RouteSelect
      :routes="store.state.routes"
      @select="store.selectRoute" />
    <AvalancheNotify />
    <AvalancheRisk :risk="store.state.avalancheRisk" />
  </div>
</template>

<script setup lang="ts">
import { RouteSelect, AvalancheRisk, AvalancheNotify } from './partials';
import store from '/@/store';
</script>
