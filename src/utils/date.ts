export const isDate = (date: unknown): date is Date => {
  return Object.prototype.toString.call(date) === '[object Date]';
};

const addZeroToNumber = (number: number): string => {
  return number < 10 ? `0${number}` : `${number}`;
};

export const formatDate = (date: Date) => {
  const { year, month, day } = getDateTimeStrings(date);
  return `${year}-${month}-${day}`;
};

export const getDateTimeStrings = (date: Date) => {
  return {
    year: date.getFullYear().toString(),
    month: addZeroToNumber(date.getMonth() + 1),
    day: addZeroToNumber(date.getDate()),
    hours: addZeroToNumber(date.getHours()),
    minutes: addZeroToNumber(date.getMinutes()),
    seconds: addZeroToNumber(date.getSeconds()),
  };
};
