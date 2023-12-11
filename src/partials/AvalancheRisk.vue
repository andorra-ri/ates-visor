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
      <details class="avalanche__avaluator" @toggle="toggleAvaluator">
        <summary class="button">
          {{ isAvaluatorVisible ? t('avalanche.avaluator.hide') : t('avalanche.avaluator.show') }}
        </summary>
        <Avaluator :risk="props.risk" />
      </details>
      <template #toggle="{ open }">
        <button class="avalanche__toggle" @click="open">
          <img :src="`/images/avalanche/risk/${props.risk}.png`" class="avalanche__risk-image">
        </button>
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { Modal, Avaluator } from '/@/components';

const { t } = useI18n();

const props = defineProps<{
  risk: number;
}>();

const isAvaluatorVisible = ref(false);
const toggleAvaluator = (event: Event) => {
  const { open } = event.target as HTMLDetailsElement;
  isAvaluatorVisible.value = open;
};
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

  &__avaluator {
    summary {
      display: flex;
      justify-content: center;
      cursor: pointer;
    }
  }
}
</style>
