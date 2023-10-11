export const chunk = (items: any[], size: number) => {
  const length = Math.ceil(items.length / size);
  return Array.from({ length }, (_, i) => {
    const bin = items.slice(i * size, i * size + size);
    return bin.length < size
      ? bin.concat(Array(size - bin.length).fill(''))
      : bin;
  });
};

export const addColumns = <T>(columns: number, callback: (item: T) => any, items: T[]) => {
  if (!items.length) return '';
  const body = chunk(items.map(callback), columns);
  return {
    widths: Array(columns).fill('*'),
    dontBreakRows: true,
    body,
  };
};
