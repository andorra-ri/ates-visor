<template>
  <label class="label">
    <em>{{ t('search') }}</em>
    <div class="input">
      <span class="icon magnifier" />
      <input
        v-model="search"
        :placeholder="t('route.search_for')"
        size="15"
        type="text">
    </div>
  </label>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { normalize } from '/@/utils';

const { t } = useI18n();

const props = defineProps<{
  modelValue: string;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const search = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', normalize(value)),
});

</script>
