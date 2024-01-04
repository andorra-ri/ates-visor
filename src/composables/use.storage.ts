import { ref, watch } from 'vue';

export const useLocalStorage = <T>(key: string, initialValue?: T) => {
  /* eslint-disable no-underscore-dangle */
  const _value = ref<T | null>(JSON.parse(localStorage.getItem(key) || 'null') ?? initialValue ?? null);

  watch(_value, value => {
    if (value == null) localStorage.removeItem(key);
    else localStorage.setItem(key, JSON.stringify(value));
  });

  return _value;
};
