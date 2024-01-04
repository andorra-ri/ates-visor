<template>
  <Modal :open="!accepted" :size="30">
    <h2>{{ t('disclaimer.exemption') }}</h2>
    <p class="warning">{{ t('disclaimer.warning') }}</p>
    <p>{{ t('disclaimer.responsibility') }}</p>
    <p>{{ t('disclaimer.acceptance') }}</p>
    <p>
      <button class="button" @click="accept">
        {{ t('disclaimer.accept') }}
      </button>
    </p>
  </Modal>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useLocalStorage } from '/@/composables';
import { Modal } from '/@/components';

const { t } = useI18n();

const accepted = useLocalStorage('ATES::disclaimer', false);

const accept = () => { accepted.value = true; };
</script>

<style scoped>
h2 { margin: 1.25rem 0; }
p { margin: 1rem 0; }
</style>
