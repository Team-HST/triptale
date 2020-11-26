package com.hst.triptale.content.trip.ui;

import com.hst.triptale.configuration.props.ApplicationProps;
import org.springdoc.core.SpringDocUtils;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.hst.triptale.configuration.ApplicationConstants;
import com.hst.triptale.content.trip.service.TripService;
import com.hst.triptale.content.trip.ui.request.TripDayScheduleAddRequest;
import com.hst.triptale.content.trip.ui.request.TripModifyingRequest;
import com.hst.triptale.content.trip.ui.request.TripSearchRequest;
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

	@Operation(summary = ApplicationConstants.Documentations.REQUIRE_AUTH + "여행 삭제", parameters = {
		@Parameter(name = "tripNo", in = ParameterIn.PATH, schema = @Schema(implementation = Long.class))
	})
	@DeleteMapping("{tripNo}")
	public ResponseEntity<Long> deleteTrip(@PathVariable Long tripNo) {
		tripService.deleteTrip(tripNo);
		return ResponseEntity.ok(tripNo);
	}

	@Operation(summary = ApplicationConstants.Documentations.REQUIRE_AUTH + "여행 수정", parameters = {
			@Parameter(name = "tripNo", in = ParameterIn.PATH, schema = @Schema(implementation = Long.class))
	})
	@PutMapping("{tripNo}")
	public ResponseEntity<Long> modifyTrip(@PathVariable Long tripNo, @RequestBody TripModifyingRequest request) {
		tripService.modifyTrip(request, tripNo);
		return ResponseEntity.ok(tripNo);
	}

	@Operation(summary = ApplicationConstants.Documentations.REQUIRE_AUTH + "여행 일차 등록", parameters = {
			@Parameter(name = "tripNo", in = ParameterIn.PATH, schema = @Schema(implementation = Long.class))
	})
	@PostMapping("{tripNo}")
	public ResponseEntity<DayScheduleResponse> addTripDaySchedule(@PathVariable Long tripNo,
																  @RequestBody TripDayScheduleAddRequest request) {
		return ResponseEntity.ok(tripService.addTripDaySchedule(tripNo, request));
	}

}
