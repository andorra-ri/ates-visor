<template>
  <section class="panel">
    <Expandable open>
      <template #toggler="{ open, toggle }">
        <header class="panel__header">
          <h2><em>{{ route.zone }}</em>{{ route.name }}</h2>
          <span :class="`chip ${route.grade}`">{{ route.grade }}</span>
          <aside class="actions">
            <button class="button button--light" @click="toggle">
              <img :src="open ? '/images/minimize.svg' : '/images/maximize.svg'">
            </button>
            <button class="button button--light" @click="emit('close')">
              <img src="/images/close.svg">
            </button>
          </aside>
        </header>
      </template>
      <ul class="panel__details">
        <li v-for="detail in details" :key="detail.id" class="label">
          <em>{{ t(`route.fields.${detail.id}`) }}</em>
          <div v-if="Array.isArray(detail.value)">
            <div v-for="(value, index) in detail.value" :key="index" class="chip">
              {{ value }}
            </div>
          </div>
          <div v-else>
            {{ detail.value }}{{ detail.unit }}
          </div>
        </li>
      </ul>
      <ul class="panel__steps">
        <li v-for="step, i in routeSteps" :key="i">
          <p>{{ step }}</p>
        </li>
      </ul>
      <aside v-if="route.waypoints.length" class="panel__waypoints">
        <h4>{{ t('route.waypoints') }}</h4>
        <ul class="panel__photos">
          <li v-for="{ id, image, kind}, i in route.waypoints" :key="id">
            <img :src="image" :class="['thumbnail', kind]" @click="goTo(i)">
          </li>
        </ul>
      </aside>
      <!--p>
        <button class="button" @click="downloadPdf">
          {{ t('download_pdf') }}
        </button>
      </p-->
    </Expandable>
    <WaypointModal
      v-if="waypoint"
      :waypoint="waypoint"
      :prev="prev"
      :next="next"
      @close="goTo(undefined)" />
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { Expandable } from '/@/components';
import { usePagination, useMap } from '/@/composables';
// import { pdf } from '/@/services';
import { toKm, toHours } from '/@/utils';
import WaypointModal from './WaypointModal.vue';
import type { Route } from '/@/types';

const props = defineProps<{
  route: Route;
}>();

const emit = defineEmits<{
  close: [];
}>();

const { t } = useI18n();
const { fitTo } = useMap();

const details = computed(() => [
  { id: 'distance', value: toKm(props.route.distance) },
  { id: 'duration', value: toHours(props.route.duration) },
  { id: 'elevation', value: props.route.elevation, unit: 'm' },
  { id: 'orientation', value: props.route.orientation },
  { id: 'departure', value: props.route.departure },
  { id: 'arrival', value: props.route.arrival },
]);

const { page, prev, next, goTo } = usePagination(props.route.waypoints);
const waypoint = computed(() => page.value !== undefined && props.route.waypoints[page.value]);

const routeSteps = computed(() => props.route.description.split('\n'));

const downloadPdf = async () => {
  await fitTo(props.route.trails, { padding: 100 });
  // pdf.createPdf(props.route.name, 'route', props.route);
};
</script>

<style lang="scss" scoped>
.panel {
  position: absolute;
  top: 100%;
  width: 25rem;
  margin: 0.5rem 0;
  max-height: 75vh;
  overflow: auto;
  padding: 1rem;

  &__header {
    display: flex;
    align-items: center;
    gap: 1rem;

    .actions { margin-left: auto; }
  }

  &__details {
    background: #8881;
    border: 1px solid #8881;
    border-radius: 0.25rem;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem 1.5rem;
    padding: 1rem;
    margin: 1rem 0;

    .label { padding: 0; }
  }

  &__steps li {
    margin: 1rem 0.5rem;
  }

  &__waypoints {
    padding: 0 0.5rem 0.5rem;

    ul {
      display: flex;
      gap: 1rem;
      padding: 1rem 0 0;
      flex-wrap: wrap;

      &:empty { display: none; }

      li { flex: 0 0 4rem; }

      .thumbnail {
        height: 4rem;
        width: 4rem;
        object-fit: cover;
        border-radius: 0.25rem;
        cursor: pointer;

        &.ALERT {
          box-shadow:
            0 0 0 0.125rem #ffbe0b88,
            0 0 0 0.35rem #ffbe0b33;
          }
      }
    }
  }
}
</style>
