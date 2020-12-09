import http from '../http';

const dayScheduleService = {
  searchDaySchedules: (tripNo) => {
    return http.get(`/api/content/trips/${tripNo}/day-schedules`);
  },
};

export default dayScheduleService;
