import dayjs from 'dayjs';

export const getDate = (date: string, format: string) => {
  return dayjs(date).format(format);
};

export const getSchedule = (startDate: string, endDate: string) => {
  return `${getDate(startDate, 'DD MMM YYYY HH:mm')} - ${getDate(endDate, 'HH:mm')}`;
};
