export const toKm = (meters: number, digits = 1) => `${Math.round(meters / 100).toFixed(digits)}km`;

export const toHours = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const mins = `${minutes % 60}`.padStart(2, '0');
  return `${hours}h${mins}`;
};
