package com.hst.triptale.content.trip.service;

import java.time.LocalTime;

import org.springframework.stereotype.Service;

import com.hst.triptale.content.trip.entity.Location;
import com.hst.triptale.content.trip.entity.Trip;
import com.hst.triptale.content.trip.repository.TripRepository;
import com.hst.triptale.content.trip.ui.request.TripModifyingRequest;
import com.hst.triptale.content.trip.ui.response.TripResponse;
import com.hst.triptale.content.user.service.UserService;

import lombok.RequiredArgsConstructor;

/**
 * @author dlgusrb0808@gmail.com
 */
@RequiredArgsConstructor
@Service
public class TripService {
	private final TripRepository tripRepository;
	private final UserService userService;

	/**
	 * 여행 등록
	 * @param request 여행 등록 요청
	 * @return 여행 정보
	 */
	public TripResponse createTrip(TripModifyingRequest request) {
		Trip createdTrip = tripRepository.save(Trip.builder()
			.title(request.getTitle())
			.description(request.getDescription())
			.area(request.getArea())
			.location(Location.of(request.getLatitude(), request.getLongitute()))
			.thumbnailFileNo(request.getThumbnailFileNo())
			.startAt(request.getStartAt().atTime(LocalTime.MIN))
			.endAt(request.getEndAt().atTime(LocalTime.MAX))
			.materials(request.getMaterials())
			.registrar(userService.getUserEntity(request.getUserNo()))
			.build());
		return TripResponse.from(createdTrip);
	}
}
