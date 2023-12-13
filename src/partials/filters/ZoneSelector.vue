<template>
  <Selector
    v-model="zone"
    :options="props.zones"
    :placeholder="t('select', [t('route.fields.zone')])"
    clearable />
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { Selector } from '/@/components';

const props = defineProps<{
  zones: string[];
}>();

const zone = defineModel<string[]>({ required: true });

const { t } = useI18n();
</script>

<style lang="scss" scoped>
.selector { width: 12rem; }
</style>
