<template>
  <div class="dropdown">
    <div class="dropdown__toggle" tabindex="1">
      <slot name="toggle" />
    </div>
    <div class="dropdown__panel">
      <slot />
    </div>
  </div>
</template>

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
