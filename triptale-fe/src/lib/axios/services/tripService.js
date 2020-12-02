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
   * 여행 수정
   *
   * @param trip (수정 여행 정보)
   * @param tripNo (수중 여행 번호)
   */
  updateTrip: (trip, tripNo) => {
    return http.put(`/api/content/trips/${tripNo}`, trip);
  },

  /**
   * 여행 상세 조회
   *
   * @param tripNo (여행 번호)
   */
  searchTrip: (tripNo) => {
    return http.get(`/api/content/trips/${tripNo}`);
  },

  /**
   * 여행 목록 조회
   *
   * @param searchNm (여행 검색)
   */
  searchTrips: (searchNm) => {
    searchNm = searchNm ? searchNm : '';
    const userNo = sessionStorage.getItem('userNo');
    return http.get(`/api/content/trips/search?userNo=${userNo}&searchTitle=${searchNm}`);
  },

  /**
   * 여행 삭제
   *
   * @param tripNo (여행 번호)
   */
  removeTrip: (tripNo) => {
    return http.delete(`/api/content/trips/${tripNo}`);
  },
};

export default tripService;
