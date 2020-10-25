package com.hst.triptale.content.trip.ui;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hst.triptale.configuration.ApplicationConstants;
import com.hst.triptale.content.trip.service.TripService;
import com.hst.triptale.content.trip.ui.request.TripModifyingRequest;
import com.hst.triptale.content.trip.ui.response.TripResponse;

import io.swagger.v3.oas.annotations.Operation;
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

	@Operation(summary = ApplicationConstants.Documentations.REQUIRE_AUTH + "여행 등록")
	@PostMapping
	public ResponseEntity<TripResponse> createTrip(@RequestBody TripModifyingRequest request) {
		return ResponseEntity.ok(tripService.createTrip(request));
	}

}
