<template>
  <dialog
    ref="modal"
    v-bind="$attrs"
    :style="`width:${size}`"
    class="modal"
    @close="closeModal">
    <slot name="close" :close="closeModal">
      <button
        v-if="props.closeable"
        class="modal__close"
        @click="closeModal">
        &times;
      </button>
    </slot>
    <header><slot name="header" /></header>
    <section class="modal__content">
      <slot :close="closeModal" />
    </section>
  </dialog>
  <slot
    name="toggle"
    :open="openModal"
    :close="closeModal"
    :toggle="toggleModal" />
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';

const props = withDefaults(defineProps<{
  open?: boolean;
  closeable?: boolean;
  size?: number | string;
}>(), { size: '20rem' });

const emit = defineEmits(['update:open', 'open', 'close', 'toggle']);

const modal = ref<HTMLDialogElement>();

const size = computed(() => (typeof props.size === 'string' ? props.size : `${props.size}em`));

const openModal = () => {
  if (modal.value) {
    modal.value.showModal();
    emit('open');
    emit('toggle', true);
    emit('update:open', true);
    const { clientHeight } = document.body;
    modal.value.classList.toggle('constrained', modal.value.offsetHeight > clientHeight * 0.9);
  }
};

const closeModal = () => {
  modal.value?.close();
  emit('close');
  emit('toggle', false);
  emit('update:open', false);
};

const toggleModal = (toOpen = !modal.value?.open) => {
  if (toOpen) openModal();
  else closeModal();
};

watch(() => props.open, toggleModal, { immediate: true });

onMounted(() => toggleModal(props.open));
</script>
