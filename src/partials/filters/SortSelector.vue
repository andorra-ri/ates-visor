<template>
  <div class="label">
    <em>{{ t('sort') }}</em>
    <Selector
      v-model="sorter"
      :options="Object.keys(props.sorters)"
      :placeholder="t('select')"
      :formatter="option => t(`sorter.${option}`)"
      clearable />
  </div>
</template>

<script setup lang="ts" generic="T">
import { useI18n } from 'vue-i18n';
import { Selector } from '/@/components';
import type { Sorter } from '/@/composables';

const { t } = useI18n();

const props = defineProps<{
  sorters: Record<string, Sorter<T>>;
}>();

const sorter = defineModel<string>({ required: true });
</script>
