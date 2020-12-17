import http from '../http';

const dayScheduleService = {
  // 여행 일차 목록 조회
  searchDaySchedules: (tripNo) => {
    return http.get(`/api/content/trips/${tripNo}/day-schedules`);
  },

  // 여행 일차 등록
  createDaySchedule: (tripNo, dayScheduleInfo) => {
    return http.post(`/api/content/trips/${tripNo}/day-schedules`, dayScheduleInfo);
  },

  // 여행 일차 수정
  updateDaySchedule: (tripNo, dayScheduleNo, dayScheduleInfo) => {
    return http.put(`/api/content/trips/${tripNo}/day-schedules/${dayScheduleNo}`, dayScheduleInfo);
  },

  // 여행 일차 삭제
  deleteDaySchedule: (tripNo, dayScheduleNo) => {
    return http.delete(`/api/content/trips/${tripNo}/day-schedules/${dayScheduleNo}`);
  },
};

export default dayScheduleService;
