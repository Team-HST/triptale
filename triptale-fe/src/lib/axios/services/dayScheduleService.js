import http from '../http';

const dayScheduleService = {
  // 여행 일차 목록 조회
  searchDaySchedules: (tripNo) => {
    return http.get(`/api/content/trips/${tripNo}/day-schedules`);
  },

  // 여행 일차 등록
  createDaySchedule: (tripNo, description) => {
    return http.post(`/api/content/trips/${tripNo}/day-schedules`, { description: description });
  },

  // 여행 일차 수정
  updateDaySchedule: (tripNo, dayScheduleNo, description) => {
    return http.put(`/api/content/trips/${tripNo}/day-schedules/${dayScheduleNo}`, {
      description: description,
    });
  },
};

export default dayScheduleService;
