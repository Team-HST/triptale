import { differenceInDays } from 'date-fns';

const DateUtils = {
  /**
   * 시작, 종료 일자 차이 검사
   * 시작 일자가 작을 경우 true
   *
   * @param {시작 일자} startDate
   * @param {종료일자} endDate
   */
  getIsDayDifference(startDate, endDate) {
    return differenceInDays(startDate, endDate) < 0;
  },
};

export default DateUtils;
