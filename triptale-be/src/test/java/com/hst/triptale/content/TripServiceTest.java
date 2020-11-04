package com.hst.triptale.content;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.BDDMockito.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.test.util.ReflectionTestUtils;

import com.hst.triptale.content.trip.entity.Trip;
import com.hst.triptale.content.trip.repository.TripRepository;
import com.hst.triptale.content.trip.service.TripService;
import com.hst.triptale.content.trip.ui.request.TripModifyingRequest;
import com.hst.triptale.content.trip.ui.response.TripListResponse;
import com.hst.triptale.content.trip.ui.response.TripResponse;
import com.hst.triptale.content.user.entity.User;
import com.hst.triptale.content.user.exception.UserNotFoundException;
import com.hst.triptale.content.user.repository.UserRepository;

/**
 * @author dlgusrb0808@gmail.com
 */
@ExtendWith(MockitoExtension.class)
class TripServiceTest {

	@Mock
	private TripRepository tripRepository;

	@Mock
	private UserRepository userRepository;

	private TripService tripService;

	@BeforeEach
	public void setUp() {
		tripService = new TripService(tripRepository, userRepository);
	}

	@Test
	@DisplayName("여행 등록 테스트")
	void createTripTest() {
		// given
		TripModifyingRequest request = createTripModifyingRequest();
		given(userRepository.findById(request.getUserNo()))
			.willReturn(Optional.of(mock(User.class)));

		// when
		TripResponse response = tripService.createTrip(request);

		// then
		verify(userRepository).findById(request.getUserNo());
		verify(tripRepository).save(any(Trip.class));
		assertNotNull(response);
		assertEquals(request.getTitle(), response.getTitle());
		assertEquals(request.getDescription(), response.getDescription());
		assertEquals(request.getArea(), response.getArea());
		assertEquals(request.getLatitude(), response.getLatitude());
		assertEquals(request.getLongitude(), response.getLongitude());
		assertEquals(request.getStartAt(), response.getStartAt());
		assertEquals(request.getEndAt(), response.getEndAt());
		assertEquals(request.getMaterials(), response.getMaterials());
	}

	@Test
	@DisplayName("여행 등톡 테스트 - 사용자를 찾을 수 없는 경우")
	void createTripFailTest_userNotFound() {
		TripModifyingRequest request = createTripModifyingRequest();
		assertThrows(UserNotFoundException.class, () -> tripService.createTrip(request));
	}

	@Test
	@DisplayName("여행 검색 테스트")
	@SuppressWarnings("unchecked")
	void getTripsTest() {
		// given

		String searchTitle = "searchTitle";
		given(tripRepository.findAll(any(Specification.class), any(Pageable.class)))
			.willReturn(new PageImpl(new ArrayList<Trip>()));

		// when
		TripListResponse response = tripService.searchTrip(searchTitle, mock(Pageable.class));

		// then
		verify(tripRepository).findAll(any(Specification.class), any(Pageable.class));
		assertNotNull(response);
	}

	// 여행 등록 / 수정 요청 모델 생성
	private TripModifyingRequest createTripModifyingRequest() {
		TripModifyingRequest request = new TripModifyingRequest();
		ReflectionTestUtils.setField(request, "title", "title");
		ReflectionTestUtils.setField(request, "description", "description");
		ReflectionTestUtils.setField(request, "area", "area");
		ReflectionTestUtils.setField(request, "thumbnailFileNo", 1L);
		ReflectionTestUtils.setField(request, "latitude", 1D);
		ReflectionTestUtils.setField(request, "longitude", 1D);
		ReflectionTestUtils.setField(request, "startAt", LocalDate.now());
		ReflectionTestUtils.setField(request, "endAt", LocalDate.now());
		ReflectionTestUtils.setField(request, "materials", "materials");
		ReflectionTestUtils.setField(request, "userNo", 1L);
		return request;
	}



}
