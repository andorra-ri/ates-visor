<template>
  <Modal
    :size="30"
    :class="waypoint.kind"
    closeable
    open>
    <template #header>
      <div class="cover">
        <img :src="waypoint.image" class="cover">
        <div class="arrows">
          <button v-if="prev" @click="prev()">&lt;</button>
          <button v-if="next" @click="next()">&gt;</button>
        </div>
      </div>
    </template>
    <h3 v-if="waypoint.description">{{ waypoint.name }}</h3>
    <p>{{ waypoint.description || waypoint.name }}</p>
    <template #toggler="{ open }">
      <slot :open="open" />
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { watchEffect } from 'vue';
import { Modal } from '/@/components';
import { useMap } from '/@/composables';
import type { Waypoint } from '/@/types';

const props = defineProps<{
  waypoint: Waypoint;
  prev?:() => void;
  next?:() => void;
}>();

const { fitTo } = useMap();
watchEffect(() => fitTo(props.waypoint.geometry));
</script>

<style lang="scss" scoped>
.modal {
  .cover {
    position: relative;

    img {
      display: block;
      border-radius: 0.25rem 0.25rem 0 0;
      max-width: 30rem;
      max-height: 25rem;
    }

    .arrows {
      position: absolute;
      bottom: -1px;
      right: 0;
      background: #fff;

      button {
        all: unset;
        padding: 0.75rem 1rem;
        background: #fff;
        cursor: pointer;
      }
    }
  }
}
</style>
