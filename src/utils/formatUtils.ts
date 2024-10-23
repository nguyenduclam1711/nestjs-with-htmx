import * as dayjs from 'dayjs';

export const FormatUtils = {
  formatFullDate(value: dayjs.ConfigType) {
    if (!value) {
      return '';
    }
    return dayjs(value).format('DD/MM/YYYY hh:mm:ss');
  },
};
