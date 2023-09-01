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
          <em>{{ t(`route.${detail.id}`) }}</em>
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
    </details>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import type { Route } from '/@/types';

const props = defineProps<{
  route: Route;
}>();

const { t } = useI18n();

const details = computed(() => [
  { id: 'distance', value: props.route.distance, unit: 'm' },
  { id: 'duration', value: props.route.duration, unit: 'h' },
  { id: 'drop', value: props.route.verticalDrop, unit: 'm' },
  { id: 'drientation', value: props.route.orientation },
]);

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

}
</style>
