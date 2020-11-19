package com.hst.triptale.content.trip.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hst.triptale.content.trip.entity.Trip;
import com.hst.triptale.content.trip.entity.TripSpecifications;
import com.hst.triptale.content.trip.exception.TripNotFoundException;
import com.hst.triptale.content.trip.repository.TripRepository;
import com.hst.triptale.content.trip.ui.request.TripModifyingRequest;
import com.hst.triptale.content.trip.ui.request.TripSearchRequest;
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
	 * 여행 삭제
	 * @param tripNo 여행 번호
	 */
	@Transactional
	public void deleteTrip(long tripNo) {
		Trip trip = tripRepository.findById(tripNo).orElseThrow(() -> new TripNotFoundException(tripNo));

		permissionChecker.checkPermission(trip);

		tripRepository.delete(trip);
	}
}
