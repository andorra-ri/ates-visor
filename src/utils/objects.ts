export const toArray = <T>(item: T | T[]): T[] => (Array.isArray(item) ? item : [item]);

export const normalize = (string: string): string => string
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLowerCase();
