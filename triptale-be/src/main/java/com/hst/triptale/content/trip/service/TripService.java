package com.hst.triptale.content.trip.service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hst.triptale.content.schedule.entity.DaySchedule;
import com.hst.triptale.content.trip.entity.Trip;
import com.hst.triptale.content.trip.entity.TripSpecifications;
import com.hst.triptale.content.trip.exception.TripDayScheduleAlreadyExistException;
import com.hst.triptale.content.trip.exception.TripNotFoundException;
import com.hst.triptale.content.trip.repository.DayScheduleRepository;
import com.hst.triptale.content.trip.repository.TripRepository;
import com.hst.triptale.content.trip.ui.request.TripDayScheduleAddRequest;
import com.hst.triptale.content.trip.ui.request.TripModifyingRequest;
import com.hst.triptale.content.trip.ui.request.TripSearchRequest;
import com.hst.triptale.content.trip.ui.response.DayScheduleResponse;
import com.hst.triptale.content.trip.ui.response.TripListResponse;
import com.hst.triptale.content.trip.ui.response.TripResponse;
import com.hst.triptale.content.user.entity.User;
import com.hst.triptale.content.user.exception.UserNotFoundException;
import com.hst.triptale.content.user.repository.UserRepository;
import com.hst.triptale.security.permission.ContentResourcePermissionChecker;

import lombok.RequiredArgsConstructor;

/**
 * @author dlgusrb0808@gmail.com
 */
@RequiredArgsConstructor
@Service
public class TripService {
	private final DayScheduleRepository dayScheduleRepository;
	private final TripRepository tripRepository;
	private final UserRepository userRepository;
	private final ContentResourcePermissionChecker permissionChecker;

	/**
	 * 여행 등록
	 * @param request 여행 등록 요청
	 * @return 여행 정보
	 */
	@Transactional
	public TripResponse createTrip(TripModifyingRequest request) {
		User user = userRepository.findById(request.getUserNo())
			.orElseThrow(() -> new UserNotFoundException(request.getUserNo()));
		Trip trip = Trip.createTrip(request, user);
		tripRepository.save(trip);
		return TripResponse.from(trip);
	}

	/**
	 * 여행 검색
	 * @param request 여행 제목 검색어
	 * @param pageable 페이징 정보
	 * @return 검색 결과 목록
	 */
	public TripListResponse searchTrip(TripSearchRequest request, Pageable pageable) {
		Page<Trip> searchPage = tripRepository.findAll(TripSpecifications.buildSpecification(request), pageable);
		return new TripListResponse(searchPage);
	}

	/**
	 * 여행 상세 조회
	 * @param tripNo 여행 번호
	 * @return 여행 상세 정보
	 */
	public TripResponse getTrip(Long tripNo) {
		return TripResponse.from(getTripEntity(tripNo));
	}

	/**
	 * 여행 삭제
	 * @param tripNo 여행 번호
	 */
	@Transactional
	public void deleteTrip(long tripNo) {
		Trip trip = tripRepository.findById(tripNo).orElseThrow(() -> new TripNotFoundException(tripNo));

		permissionChecker.checkPermission(trip);

		tripRepository.delete(trip);
	}

	/**
	 * 여행 수정
	 * @param request 여행 수정 요청
	 */
	@Transactional
	public void modifyTrip(TripModifyingRequest request, Long tripNo) {
		Trip trip = getTripEntity(tripNo);
		permissionChecker.checkPermission(trip);
		trip.changeContent(request);
		tripRepository.save(trip);
	}

	/**
	 * 여행 일차 조회
	 * @return
	 */
	public List<DayScheduleResponse> getTripDaySchedules(Long tripNo) {
		return getTripEntity(tripNo)
			.getDaySchedules()
			.stream()
			.sorted(Comparator.comparing(DaySchedule::getOrder))
			.map(DayScheduleResponse::from)
			.collect(Collectors.toList());
	}

	/**
	 * 여행 일차 등록
	 * @param tripNo 여행 번호
	 * @param request 여행 일차 등록 요청
	 * @return 등록된 여행 일차 정보
	 */
	@Transactional
	public DayScheduleResponse addTripDaySchedule(Long tripNo, TripDayScheduleAddRequest request) {
		Trip trip = getTripEntity(tripNo);
		permissionChecker.checkPermission(trip);
		if (dayScheduleRepository.existsByTripNoAndOrder(tripNo, request.getOrder())) {
			throw new TripDayScheduleAlreadyExistException()
					.addAttribute("tripNo", tripNo)
					.addAttribute("order", request.getOrder());
		}
		DaySchedule createdDaySchedule = dayScheduleRepository.save(DaySchedule.builder()
				.order(request.getOrder())
				.description(request.getDescription())
				.trip(trip)
				.build());
		trip.addDaySchedule(createdDaySchedule);
		return DayScheduleResponse.from(createdDaySchedule);
	}

	private Trip getTripEntity(Long tripNo) {
		return tripRepository.findById(tripNo).orElseThrow(() -> new TripNotFoundException(tripNo));
	}
}
