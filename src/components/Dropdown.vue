<template>
  <div class="dropdown" @focusin="onOpen" @focusout="onClose">
    <div class="dropdown__toggle" tabindex="1">
      <slot name="toggle" />
    </div>
    <div class="dropdown__panel" tabindex="1">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
const isOpen = defineModel<boolean>('open', { default: false });

const onOpen = () => { isOpen.value = true; };
const onClose = () => { isOpen.value = false; };
</script>

<style lang="scss" scoped>
.dropdown {
  position: relative;

  &__panel {
    position: absolute;
    top: 100%;
    margin: 0.25rem 0;
    z-index: 1;
    display: none;

    :focus + &,
    &:focus-within,
    &:hover { display: block; }
  }
}
</style>
