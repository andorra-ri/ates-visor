<template>
  <div class="dropdown">
    <div class="dropdown__toggler" tabindex="0">
      <slot name="toggler">
        {{ props.label || 'Dropdown' }}
      </slot>
    </div>
    <div class="dropdown__container">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineSlots<{
  default?:(props: object) => void;
  toggler?:(props: object) => void;
}>();

const props = defineProps<{
  label?: string;
}>();
</script>

<style lang="scss" scoped>
.dropdown {
  display: inline-block;
  position: relative;
  vertical-align: middle;
  overflow: visible;

  &__toggler {
    display: flex;
    align-items: center;
  }

  &__container {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 2;
    box-sizing: border-box;
    display: none;
    margin: 0.125rem 0;
    background: var(--color-bg);
    box-shadow:
      0 0 0 1px var(--color-border),
      0 0.25rem 0.75rem 0 var(--color-border);
    border-radius: 0.25rem;
  }

  &[top] > &__container {
    bottom: 100%;
    top: unset;
  }

  &[right] > &__container {
    left: unset;
    right: 0;
  }

  &[block] { width: 100%; }
  &[disabled] { cursor: not-allowed; }
  &[disabled] &__container { display: none !important; }

  &__container:hover,
  &__toggler:focus-within + &__container { display: block; }
}
</style>
