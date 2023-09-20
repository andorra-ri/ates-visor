<template>
  <section class="panel">
    <details class="panel__content" open>
      <summary class="arrow">
        <h3>{{ route.name }}</h3>
        <span :class="`chip ${route.grade}`">
          {{ route.grade }}
        </span>
      </summary>
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
    </details>
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
import { usePagination } from '/@/composables';
import WaypointModal from './WaypointModal.vue';
import type { Route } from '/@/types';

const props = defineProps<{
  route: Route;
}>();

const { t } = useI18n();

const toKm = (distance: number) => Math.round(distance / 100) / 10; // distance in meters

const toHours = (duration: number) => { // duration in minutes
  const hours = Math.floor(duration / 60);
  const minutes = `${duration % 60}`.padStart(2, '0');
  return `${hours}h${minutes}`;
};

const details = computed(() => [
  { id: 'distance', value: toKm(props.route.distance), unit: 'km' },
  { id: 'duration', value: toHours(props.route.duration) },
  { id: 'drop', value: props.route.verticalDrop, unit: 'm' },
  { id: 'orientation', value: props.route.orientation },
]);

const { page, prev, next, goTo } = usePagination(props.route.waypoints);
const waypoint = computed(() => page.value !== undefined && props.route.waypoints[page.value]);

const routeSteps = computed(() => props.route.description.split('\n'));
</script>

<style lang="scss" scoped>
.panel {
  position: absolute;
  top: 100%;
  margin: 0.5rem 0;
  max-height: 75vh;
  overflow: auto;

  &__content {
    margin: 1rem;

    summary {
      display: flex;
      align-items: center;
      gap: 1rem;

      &::after {
        content: "";
        height: 0.5rem;
        width: 0.5rem;
        flex: 0 0 0.5rem;
        transform: rotate(45deg);
        border: 2px solid #8886;
        border-width: 0 2px 2px 0;
        margin: 0.125rem 0.25rem 0 auto;
        transition: all 0.3s ease;
        cursor: pointer;
      }
    }

    &[open] summary::after {
      transform: rotate(-135deg);
      margin: 0.35rem 0.25rem 0 auto;
    }
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
