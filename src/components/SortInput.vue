<template>
  <div class="label">
    <em>{{ t('sort') }}</em>
    <Selector v-model="sortBy" :options="props.sorters" clearable>
      <template #default="{ item }">
        <slot>{{ item ? t(`sorter.${item}`) : t('sort_placeholder') }}</slot>
      </template>
    </Selector>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { Selector } from '/@/components';

const props = defineProps<{
  modelValue?: string | undefined;
  sorters:(string | undefined)[];
  placeholder?: string;
}>();

const emit = defineEmits<{(e: 'update:modelValue', value: string | undefined): void}>();

const sortBy = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value),
});

const { t } = useI18n();
</script>
