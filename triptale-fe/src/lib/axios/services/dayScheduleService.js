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
   * 여행 일차 장소 목록 조회
   *
   * @param tripNo (여행 번호)
   * @param dayScheduleNo (일차 번호)
   */
  searchDaySchedulePlaces: (tripNo, dayScheduleNo) => {
    return http.get(`/api/content/trips/${tripNo}/day-schedules/${dayScheduleNo}/places`);
  },

  /**
   * 여행 일차 장소 상세 조회
   *
   * @param tripNo (여행 번호)
   * @param dayScheduleNo (일차 번호)
   */
  searchDaySchedulePlace: (tripNo, dayScheduleNo, placeNo) => {
    return http.get(
      `/api/content/trips/${tripNo}/day-schedules/${dayScheduleNo}/places/${placeNo}`
    );
  },

  /**
   * 여행 일차 별 장소 등록
   *
   * @param tripNo (여행 번호)
   * @param dayScheduleNo (일차 번호)
   * @param place (등록 장소 정보)
   */
  createDaySchedulePlace: (tripNo, dayScheduleNo, place) => {
    return http.post(`/api/content/trips/${tripNo}/day-schedules/${dayScheduleNo}/places`, place);
  },

  /**
   * 여행 일차 별 장소 수정
   *
   * @param tripNo (여행 번호)
   * @param dayScheduleNo (일차 번호)
   * @param place (등록 장소 정보)
   */
  updateDaySchedulePlace: (tripNo, dayScheduleNo, place) => {
    return http.put(
      `/api/content/trips/${tripNo}/day-schedules/${dayScheduleNo}/places/${place.placeNo}`,
      place
    );
  },

  /**
   * 여행 장소 삭제
   *
   * @param tripNo (여행번호)
   * @param dayScheduleNo (일차 번호)
   * @param placeNo (장소 번호)
   */
  deleteDaySchedulePlace: (tripNo, dayScheduleNo, placeNo) => {
    return http.delete(
      `/api/content/trips/${tripNo}/day-schedules/${dayScheduleNo}/places/${placeNo}`
    );
  },

  /**
   * Kakao 장소검색 API 섬네일 검색
   *
   * @param placeUrl (여행 번호)
   */
  searchKakaoPlaceAPIThumbnails: (placeUrl) => {
    return http.get(`/api/content/places/support/extract-thumbnail?sourceUrl=${placeUrl}`);
  },
};

export default dayScheduleService;
