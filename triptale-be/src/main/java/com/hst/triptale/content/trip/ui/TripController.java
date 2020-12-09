package com.hst.triptale.content.trip.ui;

import org.springdoc.core.SpringDocUtils;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hst.triptale.configuration.ApplicationConstants;
import com.hst.triptale.content.trip.service.TripService;
import com.hst.triptale.content.trip.ui.request.TripDayScheduleModifyRequest;
import com.hst.triptale.content.trip.ui.request.TripModifyingRequest;
import com.hst.triptale.content.trip.ui.request.TripSearchRequest;
import com.hst.triptale.content.trip.ui.response.DayScheduleListResponse;
import com.hst.triptale.content.trip.ui.response.DayScheduleResponse;
import com.hst.triptale.content.trip.ui.response.TripListResponse;
import com.hst.triptale.content.trip.ui.response.TripResponse;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

/**
 * @author dlgusrb0808@gmail.com
 */
@Tag(name = "여행 API", description = "여행 관련 API")
@RequiredArgsConstructor
@RestController
@RequestMapping(ApplicationConstants.APIGroups.CONTENT_API + "/trips")
public class TripController {

	private final TripService tripService;

	static {
		SpringDocUtils.getConfig().addAnnotationsToIgnore(
			RequestParam.class,
			PageableDefault.class,
			PathVariable.class
		);
	}

	@Operation(summary = ApplicationConstants.Documentations.REQUIRE_AUTH + "여행 등록")
	@PostMapping
	public ResponseEntity<TripResponse> createTrip(@RequestBody TripModifyingRequest request) {
		return ResponseEntity.ok(tripService.createTrip(request));
	}

	@Operation(summary = ApplicationConstants.Documentations.REQUIRE_AUTH + "여행 검색", parameters = {
		@Parameter(name = "userNo", in = ParameterIn.QUERY, schema = @Schema(implementation = Long.class)),
		@Parameter(name = "searchTitle", in = ParameterIn.QUERY, schema = @Schema(implementation = String.class)),
		@Parameter(name = "page", in = ParameterIn.QUERY, schema = @Schema(implementation = Integer.class)),
		@Parameter(name = "size", in = ParameterIn.QUERY, schema = @Schema(implementation = Integer.class)),
	})
	@GetMapping("/search")
	public ResponseEntity<TripListResponse> searchTrip(@Parameter(hidden = true) TripSearchRequest request,
		@PageableDefault(size = 1000) Pageable pageable) {
		return ResponseEntity.ok(tripService.searchTrip(request, pageable));
	}

	@Operation(summary = ApplicationConstants.Documentations.REQUIRE_AUTH + "여행 상세 조회", parameters = {
		@Parameter(name = "tripNo", in = ParameterIn.PATH, schema = @Schema(implementation = Long.class))
	})
	@GetMapping("{tripNo}")
	public ResponseEntity<TripResponse> getTrip(@PathVariable Long tripNo) {
		return ResponseEntity.ok(tripService.getTrip(tripNo));
	}

	@Operation(summary = ApplicationConstants.Documentations.REQUIRE_AUTH + "여행 수정", parameters = {
			@Parameter(name = "tripNo", in = ParameterIn.PATH, schema = @Schema(implementation = Long.class))
	})
	@PutMapping("{tripNo}")
	public ResponseEntity<Long> modifyTrip(@PathVariable Long tripNo, @RequestBody TripModifyingRequest request) {
		tripService.modifyTrip(request, tripNo);
		return ResponseEntity.ok(tripNo);
	}

	@Operation(summary = ApplicationConstants.Documentations.REQUIRE_AUTH + "여행 삭제", parameters = {
		@Parameter(name = "tripNo", in = ParameterIn.PATH, schema = @Schema(implementation = Long.class))
	})
	@DeleteMapping("{tripNo}")
	public ResponseEntity<Long> deleteTrip(@PathVariable Long tripNo) {
		tripService.deleteTrip(tripNo);
		return ResponseEntity.ok(tripNo);
	}

	@Operation(summary = ApplicationConstants.Documentations.REQUIRE_AUTH + "여행 일차 조회", parameters = {
		@Parameter(name = "tripNo", in = ParameterIn.PATH, schema = @Schema(implementation = Long.class))
	})
	@GetMapping("{tripNo}/day-schedules")
	public ResponseEntity<DayScheduleListResponse> getTripDaySchedules(@PathVariable Long tripNo) {
		return ResponseEntity.ok(tripService.getTripDaySchedules(tripNo));
	}

	@Operation(summary = ApplicationConstants.Documentations.REQUIRE_AUTH + "여행 일차 추가", parameters = {
			@Parameter(name = "tripNo", in = ParameterIn.PATH, schema = @Schema(implementation = Long.class))
	})
	@PostMapping("{tripNo}/day-schedules")
	public ResponseEntity<DayScheduleResponse> addTripDaySchedule(@PathVariable Long tripNo) {
		return ResponseEntity.ok(tripService.addTripDaySchedule(tripNo));
	}

	@Operation(summary = ApplicationConstants.Documentations.REQUIRE_AUTH + "여행 일차 수정", parameters = {
		@Parameter(name = "tripNo", in = ParameterIn.PATH, schema = @Schema(implementation = Long.class)),
		@Parameter(name = "dayScheduleNo", in = ParameterIn.PATH, schema = @Schema(implementation = Long.class))
	})
	@PutMapping("{tripNo}/day-schedules/{dayScheduleNo}")
	public ResponseEntity<DayScheduleResponse> addTripDaySchedule(@PathVariable Long tripNo,
		@PathVariable Long dayScheduleNo,
		@RequestBody TripDayScheduleModifyRequest request) {
		return ResponseEntity.ok(tripService.modifyTripDaySchedule(dayScheduleNo, request));
	}

}
