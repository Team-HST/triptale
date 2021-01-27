package com.hst.triptale.content.place.ui;

import java.util.List;

import org.springdoc.core.SpringDocUtils;
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
import com.hst.triptale.content.place.service.PlaceService;
import com.hst.triptale.content.place.ui.request.PlaceModifyingRequest;
import com.hst.triptale.content.place.ui.response.PlaceListResponse;
import com.hst.triptale.content.place.ui.response.PlaceResponse;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * @author dlgusrb0808@gmail.com
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

	static {
		SpringDocUtils.getConfig().addAnnotationsToIgnore(
			RequestParam.class,
			PageableDefault.class,
			PathVariable.class
		);
	}

	@Operation(summary = ApplicationConstants.Documentations.REQUIRE_AUTH + "장소 목록 조회", parameters = {
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

	@Operation(summary = ApplicationConstants.Documentations.REQUIRE_AUTH + "장소 상세 조회", parameters = {
		@Parameter(name = "tripNo", in = ParameterIn.PATH, schema = @Schema(implementation = Long.class)),
		@Parameter(name = "dayScheduleNo", in = ParameterIn.PATH, schema = @Schema(implementation = Long.class)),
		@Parameter(name = "placeNo", in = ParameterIn.PATH, schema = @Schema(implementation = Long.class)),
	})
	@GetMapping("{placeNo}")
	public ResponseEntity<PlaceResponse> getPlace(
		@PathVariable Long tripNo,
		@PathVariable Long dayScheduleNo,
		@PathVariable Long placeNo
	) {
		return ResponseEntity.ok(placeService.getPlace(placeNo));
	}

	@Operation(summary = ApplicationConstants.Documentations.REQUIRE_AUTH + "장소 등록", parameters = {
		@Parameter(name = "tripNo", in = ParameterIn.PATH, schema = @Schema(implementation = Long.class)),
		@Parameter(name = "dayScheduleNo", in = ParameterIn.PATH, schema = @Schema(implementation = Long.class))
	})
	@PostMapping
	public ResponseEntity<PlaceResponse> addPlace(
		@PathVariable Long tripNo,
		@PathVariable Long dayScheduleNo,
		@RequestBody PlaceModifyingRequest request
	) {
		return ResponseEntity.ok(placeService.addPlace(request));
	}

	@Operation(summary = ApplicationConstants.Documentations.REQUIRE_AUTH + "장소 수정", parameters = {
		@Parameter(name = "tripNo", in = ParameterIn.PATH, schema = @Schema(implementation = Long.class)),
		@Parameter(name = "dayScheduleNo", in = ParameterIn.PATH, schema = @Schema(implementation = Long.class)),
		@Parameter(name = "placeNo", in = ParameterIn.PATH, schema = @Schema(implementation = Long.class)),
	})
	@PutMapping("{placeNo}")
	public ResponseEntity<PlaceResponse> modifyPlace(
		@PathVariable Long tripNo,
		@PathVariable Long dayScheduleNo,
		@PathVariable Long placeNo,
		@RequestBody PlaceModifyingRequest request
	) {
		return ResponseEntity.ok(placeService.modifyPlace(placeNo, request));
	}

	@Operation(summary = ApplicationConstants.Documentations.REQUIRE_AUTH + "장소 삭제", parameters = {
		@Parameter(name = "tripNo", in = ParameterIn.PATH, schema = @Schema(implementation = Long.class)),
		@Parameter(name = "dayScheduleNo", in = ParameterIn.PATH, schema = @Schema(implementation = Long.class)),
		@Parameter(name = "placeNo", in = ParameterIn.PATH, schema = @Schema(implementation = Long.class)),
	})
	@DeleteMapping("{placeNo}")
	public ResponseEntity<PlaceResponse> deletePlace(
		@PathVariable Long tripNo,
		@PathVariable Long dayScheduleNo,
		@PathVariable Long placeNo
	) {
		return ResponseEntity.ok(placeService.deletePlace(placeNo));
	}

	@Operation(summary = ApplicationConstants.Documentations.REQUIRE_AUTH + "장소 삭제", parameters = {
		@Parameter(name = "tripNo", in = ParameterIn.PATH, schema = @Schema(implementation = Long.class)),
		@Parameter(name = "dayScheduleNo", in = ParameterIn.PATH, schema = @Schema(implementation = Long.class)),
		@Parameter(name = "placeNo", in = ParameterIn.PATH, schema = @Schema(implementation = Long.class)),
	})
	@GetMapping("extract-thumbnail")
	public ResponseEntity<List<String>> extractThumbnails() {
		return null;
	}
}
