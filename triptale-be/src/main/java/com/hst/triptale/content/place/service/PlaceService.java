package com.hst.triptale.content.place.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hst.triptale.content.place.entity.Place;
import com.hst.triptale.content.place.entity.PlaceType;
import com.hst.triptale.content.place.repository.PlaceRepository;
import com.hst.triptale.content.place.ui.request.PlaceModifyingRequest;
import com.hst.triptale.content.place.ui.response.PlaceListResponse;
import com.hst.triptale.content.place.ui.response.PlaceResponse;
import com.hst.triptale.content.schedule.entity.DaySchedule;
import com.hst.triptale.content.trip.entity.Location;
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
	private final PlaceThumbnailExtractService placeThumbnailExtractService;

	/**
	 * 장소 목록 조회
	 * @param dayScheduleNo 일차 번호
	 * @return 장소 목록
	 */
	public PlaceListResponse getPlaces(Long dayScheduleNo) {
		DaySchedule daySchedule = tripService.getDayScheduleEntity(dayScheduleNo);
		return PlaceListResponse.of(daySchedule, daySchedule.getPlaces());
	}

	/**
	 * 장소 추가
	 * @param request 장소 추가 요청
	 * @return 장소
	 */
	@Transactional
	public PlaceResponse addPlace(PlaceModifyingRequest request) {
		DaySchedule daySchedule = tripService.getDayScheduleEntity(request.getDayScheduleNo());
		Place place = Place.builder()
			.name(request.getName())
			.description(request.getDescription())
			.type(PlaceType.getType(request.getPlaceType()))
			.thumbnailUrl(placeThumbnailExtractService.extractThumbnailUrl(request.getPlaceInfoUrl()))
			.startAt(request.getStartAt())
			.endAt(request.getEndAt())
			.location(Location.of(request.getLatitude(), request.getLongitude()))
			.daySchedule(daySchedule)
			.build();
		placeRepository.save(place);
		daySchedule.getPlaces().add(place);
		return PlaceResponse.from(place);
	}


}
