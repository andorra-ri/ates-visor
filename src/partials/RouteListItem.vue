<template>
  <div class="route-list-item">
    <span :class="['grade', props.route.grade]" />
    <span>
      <em class="note">{{ props.route.zone }}</em>
      {{ props.route.name }}
    </span>
    <ul class="details">
      <li>
        <img src="/images/up-down.svg">
        {{ props.route.elevation }}m
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { ListRoute } from '/@/types';

const props = defineProps<{
  route: ListRoute;
}>();
</script>

<style lang="scss" scoped>
.route-list-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0.75rem;
  border-radius: 0.125rem;
  border-radius: 0.25rem;
  cursor: pointer;

  &:hover { background: #8881; }

  .grade {
    display: inline-block;
    flex: 0 0 0.5rem;
    height: 0.5rem;
    width: 0.5rem;
    margin: 0.25rem 0;
    border-radius: 0.125rem;
    background: var(--color);
  }

  em.note {
    display: block;
    font-size: 0.75em;
    opacity: 0.5;
    line-height: 1.25;
  }

  .details {
    display: flex;
    gap: 0.75rem;
    margin-left: auto;

    li {
      display: flex;
      align-items: center;
      gap: 0.125rem;
      font-size: 0.9rem;

      img {
        height: 0.8rem;
        opacity: 0.5;
      }
    }
  }
}
</style>
