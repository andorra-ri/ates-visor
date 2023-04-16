import { computed, unref } from 'vue';
import { toArray } from '/@/utils';
import type { MaybeRef, MaybeArray } from '/@/types';

export type Sorter<T> = (a: T, b: T) => number;

/* eslint-disable no-underscore-dangle */
export const useSorters = <T>() => {
  const SORTERS = {
    ASC: <S extends string | number>(a: S, b: S) => (
      typeof a === 'string' && typeof b === 'string' ? a.localeCompare(b) : Number(a) - Number(b)
    ),
    DESC: <S extends string | number>(a: S, b: S) => SORTERS.ASC(a, b) * -1,
    UP: <S>(value: S) => (a: S, b: S) => (a === value ? -1 : b === value ? 1 : 0),
    DOWN: <S>(value: S) => (a: S, b: S) => SORTERS.UP(value)(a, b) * -1,
    LIST: <S>(order: S[]) => (a: S, b: S) => order.indexOf(a) - order.indexOf(b),
    ON: <S>(get: (item: T) => S, fn: Sorter<S>) => (a: T, b: T) => fn(get(a), get(b)),
    AND: <S>(fns: Sorter<S>[]) => (a: S, b: S) => fns.reduce((acc, fn) => acc || fn(a, b), 0),
  };

  const sort = (sorters: MaybeArray<Sorter<T>>, items: MaybeRef<T[]>) => {
    const _sorters = toArray(sorters);
    return computed(() => {
      const _items = unref(items);
      return [..._items].sort((a, b) => _sorters.reduce((acc, sorter) => acc || sorter(a, b), 0));
    });
  };

  return { sort, sorters: SORTERS };
};
