export const getLocale = () => Intl.DateTimeFormat().resolvedOptions().locale.split('-')[0] ?? 'ca';

export const getLocaleField = (field: string): string => {
  console.log(`${field}_${getLocale()}`);
  return `${field}_${getLocale()}`;
};
