package com.hst.triptale.content.place.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hst.triptale.content.place.entity.Place;
import com.hst.triptale.content.place.entity.PlaceType;
import com.hst.triptale.content.place.exception.PlaceNotFountException;
import com.hst.triptale.content.place.repository.PlaceRepository;
import com.hst.triptale.content.place.ui.request.PlaceModifyingRequest;
import com.hst.triptale.content.place.ui.response.PlaceListResponse;
import com.hst.triptale.content.place.ui.response.PlaceResponse;
import com.hst.triptale.content.schedule.entity.DaySchedule;
import com.hst.triptale.content.trip.entity.Location;
import com.hst.triptale.content.trip.service.TripService;
import com.hst.triptale.security.permission.ContentResourcePermissionChecker;

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
	 * 장소 상세 조회
	 * @param placeNo 장소 번호
	 * @return 장소
	 */
	public PlaceResponse getPlace(Long placeNo) {
		return PlaceResponse.from(getPlaceEntity(placeNo));
	}

	private Place getPlaceEntity(Long placeNo) {
		return placeRepository.findById(placeNo).orElseThrow(() -> new PlaceNotFountException(placeNo));
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
			.title(request.getTitle())
			.description(request.getDescription())
			.name(request.getName())
			.thumbnailUrl(placeThumbnailExtractService.extractThumbnailUrl(request.getPlaceInfoUrl()))
			.type(PlaceType.getType(request.getPlaceType()))
			.startAt(request.getStartAt())
			.endAt(request.getEndAt())
			.location(Location.of(request.getLatitude(), request.getLongitude()))
			.daySchedule(daySchedule)
			.build();
		daySchedule.addPlace(place);
		placeRepository.save(place);
		return PlaceResponse.from(place);
	}

	/**
	 * 장소 수정
	 * @param placeNo 장소 번호
	 * @param request 장소 수정 요청
	 * @return 장소
	 */
	@Transactional
	public PlaceResponse modifyPlace(Long placeNo, PlaceModifyingRequest request) {
		Place place = getPlaceEntity(placeNo);
		place.getDaySchedule().checkPlaceOverlap(place);
		modifyPlaceContent(place, request);
		placeRepository.save(place);
		return PlaceResponse.from(place);
	}

	private void modifyPlaceContent(Place place, PlaceModifyingRequest request) {
		place.changeTitle(request.getTitle());
		place.changeDescription(request.getDescription());
		place.changeName(request.getName());
		place.changeThumbnailUrl(placeThumbnailExtractService.extractThumbnailUrl(request.getPlaceInfoUrl()));
		place.changeType(PlaceType.getType(request.getPlaceType()));
		place.changeStartAt(request.getStartAt());
		place.changeEndAt(request.getEndAt());
		place.changeLocation(Location.of(request.getLatitude(), request.getLongitude()));
	}

}
