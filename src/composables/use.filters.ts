import { unref, computed } from 'vue';
import { toArray } from '/@/utils';
import type { MaybeRef, MaybeArray } from '/@/types';

export type Filter<T> = (item: T) => boolean;

/* eslint-disable no-underscore-dangle */
export const useFilters = <T>() => {
  const filter = (filters: MaybeArray<Filter<T>>, items: MaybeRef<T[]>) => {
    const _filters = toArray(filters);
    return computed(() => {
      const _items = unref(items);
      return [..._items].filter(item => _filters.every(_filter => _filter(item)));
    });
  };

  return { filter };
};
