<template>
  <div class="dropdown">
    <div class="toggler" tabindex="0">
      <slot name="toggler">
        {{ props.label || 'Dropdown' }}
      </slot>
    </div>
    <div class="container">
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

<style lang="scss">
.dropdown {
  display: inline-block;
  position: relative;
  vertical-align: middle;
  overflow: visible;

  .toggler {
    display: flex;
    align-items: center;
  }

  .container {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 2;
    box-sizing: border-box;
    display: none;
    margin: 0.125rem 0;
  }

  &[top] > .container {
    bottom: 100%;
    top: unset;
  }

  &[right] > .container {
    left: unset;
    right: 0;
  }

  &[block] { width: 100%; }

  &[disabled] {
    cursor: not-allowed;

    .container { display: none !important; }
  }

  .container:hover,
  .toggler:focus-within + .container {
    display: block;
  }
}
</style>
