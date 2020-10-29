package com.hst.triptale.content.trip.ui;

import org.springdoc.core.SpringDocUtils;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hst.triptale.configuration.ApplicationConstants;
import com.hst.triptale.content.trip.service.TripService;
import com.hst.triptale.content.trip.ui.request.TripModifyingRequest;
import com.hst.triptale.content.trip.ui.response.TripListResponse;
import com.hst.triptale.content.trip.ui.response.TripResponse;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
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
		@Parameter(name = "searchTitle", in = ParameterIn.QUERY, schema = @Schema(implementation = String.class)),
		@Parameter(name = "page", in = ParameterIn.QUERY, schema = @Schema(implementation = Integer.class)),
		@Parameter(name = "size", in = ParameterIn.QUERY, schema = @Schema(implementation = Integer.class)),
	})
	@GetMapping("/search")
	public ResponseEntity<TripListResponse> searchTrip(
		@RequestParam(value = "searchTitle", required = false) String searchTitle,
		@PageableDefault(size = 1000) Pageable pageable) {
		return ResponseEntity.ok(tripService.searchTrip(searchTitle, pageable));
	}
}
