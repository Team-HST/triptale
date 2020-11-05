import http from '../http';

const tripService = {
  /**
   * 여행 등록
   *
   * @param trip (등록 여행 정보)
   */
  createTrip: (trip) => {
    return http.post('/api/content/trips', trip);
  },

  /**
   * 여행 목록 조회
   *
   * @param searchNm (여행 검색)
   */
  searchTrips: (searchNm) => {
    return http.get(`/api/content/trips/search?searchNm=${searchNm}`);
  },
};

export default tripService;
