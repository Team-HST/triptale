package com.hst.triptale.content.place.ui;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hst.triptale.configuration.ApplicationConstants;
import com.hst.triptale.content.place.service.PlaceService;
import com.hst.triptale.content.place.ui.response.PlaceListResponse;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * @author hyungyu.lee@nhn.com
 */
@Tag(name = "장소 API", description = "장소 관련 API")
@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping({
	ApplicationConstants.APIGroups.CONTENT_API + "/trips/{tripNo}/day-schedules/{dayScheduleNo}/places"
})
public class PlaceController {

	private final PlaceService placeService;

	@Operation(summary = ApplicationConstants.Documentations.REQUIRE_AUTH + "장소 상세 조회", parameters = {
		@Parameter(name = "tripNo", in = ParameterIn.PATH, schema = @Schema(implementation = Long.class)),
		@Parameter(name = "dayScheduleNo", in = ParameterIn.PATH, schema = @Schema(implementation = Long.class))
	})
	@GetMapping
	public ResponseEntity<PlaceListResponse> getPlaces(
		@PathVariable Long tripNo,
		@PathVariable Long dayScheduleNo
	) {
		return ResponseEntity.ok(placeService.getPlaces(dayScheduleNo));
	}

}
