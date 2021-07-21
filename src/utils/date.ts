export const isDate = (date: unknown): date is Date => {
  return Object.prototype.toString.call(date) === '[object Date]';
};

const addZeroToNumber = (number: number): string => {
  return number < 10 ? `0${number}` : `${number}`;
};

export const formatDate = (date: Date) => {
  return `${date.getFullYear()}-${addZeroToNumber(
    date.getMonth() + 1
  )}-${addZeroToNumber(date.getDate())}`;
};
