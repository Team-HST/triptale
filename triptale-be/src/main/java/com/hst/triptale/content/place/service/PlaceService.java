package com.hst.triptale.content.place.service;

import org.springframework.stereotype.Service;

import com.hst.triptale.content.place.repository.PlaceRepository;
import com.hst.triptale.content.place.ui.response.PlaceListResponse;
import com.hst.triptale.content.schedule.entity.DaySchedule;
import com.hst.triptale.content.trip.service.TripService;

import lombok.RequiredArgsConstructor;

/**
 * @author dlgusrb0808@gmail.com
 */
@RequiredArgsConstructor
@Service
public class PlaceService {

	private final PlaceRepository placeRepository;
	private final TripService tripService;

	/**
	 * 장소 목록 조회
	 * @param dayScheduleNo 일차 번호
	 * @return 장소 목록
	 */
	public PlaceListResponse getPlaces(Long dayScheduleNo) {
		DaySchedule daySchedule = tripService.getDayScheduleEntity(dayScheduleNo);
		return PlaceListResponse.of(daySchedule, placeRepository.findPlacesByDaySchedule(daySchedule));
	}

}
