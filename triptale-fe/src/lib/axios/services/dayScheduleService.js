import http from '../http';

const dayScheduleService = {
  /**
   * 여행 일차 목록 조회
   *
   * @param tripNo (여행 번호)
   */
  searchDaySchedules: (tripNo) => {
    return http.get(`/api/content/trips/${tripNo}/day-schedules`);
  },

  /**
   * 여행 일차 등록
   *
   * @param tripNo (여행 번호)
   * @param dayScheduleInfo (일차 정보)
   */
  createDaySchedule: (tripNo, dayScheduleInfo) => {
    return http.post(`/api/content/trips/${tripNo}/day-schedules`, dayScheduleInfo);
  },

  /**
   * 여행 일차 수정
   *
   * @param tripNo (여행 번호)
   * @param dayScheduleInfo (일차 정보)
   */
  updateDaySchedule: (tripNo, dayScheduleNo, dayScheduleInfo) => {
    return http.put(`/api/content/trips/${tripNo}/day-schedules/${dayScheduleNo}`, dayScheduleInfo);
  },

  /**
   * 여행 일차 삭제
   *
   * @param tripNo (여행 번호)
   * @param dayScheduleInfo (일차 정보)
   */
  deleteDaySchedule: (tripNo, dayScheduleNo) => {
    return http.delete(`/api/content/trips/${tripNo}/day-schedules/${dayScheduleNo}`);
  },

  /**
   * 여행 일차 장소 목록 검색
   *
   * @param tripNo (여행 번호)
   * @param dayScheduleNo (일차 번호)
   */
  searchDaySchedulePlace: (tripNo, dayScheduleNo) => {
    return http.get(`/api/content/trips/${tripNo}/day-schedules/${dayScheduleNo}/places`);
  },
};

export default dayScheduleService;
