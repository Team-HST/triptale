import { differenceInDays, format } from 'date-fns';

/**
 * @author hoons
 * @email dudgns0612@gmail.com
 * @create date 2020-11-06 00:13:19
 * @modify date 2021-01-20 21:24:17
 * @desc [Date 관련 유틸]
 */
const DateUtils = {
  /**
   * 시작, 종료 일자 차이값 계산
   *
   * @param {시작 일자} startDate
   * @param {종료 일자} endDate
   */
  getStrDayDifference(startDate, endDate) {
    return differenceInDays(new Date(startDate), new Date(endDate));
  },

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
   * 시작, 종료 시간 차이값 계산
   *
   * @param {시작 시간} startTime
   * @param {종료 시간} endTime
   */
  getStrTimeDifference(startTime, endTime) {
    const startArr = startTime.split(':');
    const endArr = endTime.split(':');
    return Number(startArr[0] + startArr[1]) - Number(endArr[0] + endArr[1]);
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
