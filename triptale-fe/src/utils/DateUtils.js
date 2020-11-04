import { differenceInDays, format } from 'date-fns';

const DateUtils = {
  /**
   * 시작, 종료 일자 차이 검사
   * 시작 일자가 작을 경우 true
   *
   * @param {시작 일자} startDate
   * @param {종료 일자} endDate
   */
  getIsDayDifference(startDate, endDate) {
    return differenceInDays(startDate, endDate) < 0;
  },

  /**
   * Date to String
   *
   * @param {Date Objet} date
   * @param {Date 포맷 문자열} strFormat
   */
  getDateToStr(date, strFormat) {
    return format(date, strFormat ? strFormat : 'yyyy-MM-dd');
  },
};

export default DateUtils;
