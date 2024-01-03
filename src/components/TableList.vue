<template>
  <div class="table-list">
    <header v-if="props.title || slots.header" class="table-list__header">
      <slot name="header">
        <h3>{{ props.title }}</h3>
      </slot>
    </header>
    <ul class="table-list__body">
      <slot />
    </ul>
    <footer v-if="slots.footer" class="table-list__footer">
      <slot name="footer" />
    </footer>
  </div>
</template>

<script setup lang="ts">
const slots = defineSlots<{
  default:() => void;
  header?:() => void;
  footer?:() => void;
}>();

const props = defineProps<{
  title?: string;
}>();
</script>

<style lang="scss">
.table-list {
  &__header {
    display: flex;
    padding: 1rem 0.75rem;
    border-bottom: 1px solid var(--color-border);
  }

  &__footer {
    padding: 0.5rem;
    border-top: 1px solid #8881;
    background: #8881;
  }

  &__body {
    & > li {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0.75rem;

      & + li { border-top: 1px solid #8882; }

      em {
        flex: 1;
        color: #888;
      }
    }
  }
}
</style>
