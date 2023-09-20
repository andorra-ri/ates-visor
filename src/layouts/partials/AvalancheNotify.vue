<template>
  <a :href="config.avalanches.notify" target="blank">
    <img src="/images/megaphone.png">
    <span>{{ t('avalanche.notify') }}</span>
  </a>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import config from '/@/config.yaml';

const { t } = useI18n();
</script>
