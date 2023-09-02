import { ref, unref, type MaybeRef } from 'vue';

export const usePagination = <T>(items: MaybeRef<T[]>) => {
  const page = ref<number>();

  const prev = () => {
    const { length } = unref(items);
    page.value = ((page.value || 0) - 1 + length) % length;
  };

  const next = () => {
    const { length } = unref(items);
    page.value = ((page.value || 0) + 1) % length;
  };

  const goTo = (target: number | undefined) => {
    if (target) {
      const { length } = unref(items);
      page.value = Math.max(Math.min(target, length), 0);
    } else page.value = target;
  };

  const clear = () => {
    page.value = undefined;
  };

  return { page, prev, next, goTo, clear };
};
