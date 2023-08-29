<template>
  <div class="avalanche">
    <Modal :size="35" closeable>
      <img :src="`/images/avalanche/risk/${props.risk}.png`" class="avalanche__risk-image">
      <p class="avalanche__risk-name">{{ t(`avalanche.risk.${props.risk}.name`) }}</p>
      <div class="avalanche__description">
        <p class="note">{{ t(`avalanche.risk.${props.risk}.description`) }}</p>
        <p>
          <a :href="t('avalanche.bulletin_url')" target="blank">
            {{ t('avalanche.bulletin') }}
          </a>
        </p>
      </div>
      <template #toggle="{ open }">
        <button class="avalanche__toggle" @click="open">
          <img :src="`/images/avalanche/risk/${props.risk}.png`" class="avalanche__risk-image">
        </button>
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { Modal } from '/@/components';

const { t } = useI18n();

const props = defineProps<{
  risk: number;
}>();
</script>

<style lang="scss" scoped>
.avalanche {
  text-align: center;

  &__risk-image {
    display: block;
    margin: 0.5rem auto;
    height: 4rem;
    transition: all 0.3s ease;
  }

  &__risk-name {
    font-weight: bold;
    font-size: 1.125rem;
  }

  &__description {
    margin: 1.5rem 0;
  }

  &__toggle {
    all: unset;
    padding: 0.125rem;
    height: 100%;
    box-sizing: border-box;
    cursor: pointer !important;
  }

  &__toggle &__risk-image { height: 2rem; }
}
</style>
