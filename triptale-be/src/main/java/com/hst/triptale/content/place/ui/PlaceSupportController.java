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
import com.hst.triptale.content.place.service.PlaceThumbnailExtractService;
import com.hst.triptale.content.place.ui.response.PlaceThumbnailResponse;

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
@Tag(name = "장소 서포트 API", description = "장소 관련 지원 API")
@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping({
	ApplicationConstants.APIGroups.CONTENT_API + "/places/support"
})
public class PlaceSupportController {

	private final PlaceThumbnailExtractService placeThumbnailExtractService;

	static {
		SpringDocUtils.getConfig().addAnnotationsToIgnore(
			RequestParam.class,
			PageableDefault.class,
			PathVariable.class
		);
	}

	@Operation(summary = ApplicationConstants.Documentations.REQUIRE_AUTH + "장소 썸네일 URL 다 건 추출")
	@PostMapping("extract-thumbnails")
	public ResponseEntity<List<PlaceThumbnailResponse>> extractThumbnails(@RequestBody List<String> sourceUrls) {
		return ResponseEntity.ok(placeThumbnailExtractService.extractThumbnailUrls(sourceUrls));
	}

	@Operation(summary = ApplicationConstants.Documentations.REQUIRE_AUTH + "장소 썸네일 URL 추출", parameters = {
		@Parameter(name = "sourceUrl", in = ParameterIn.QUERY, schema = @Schema(implementation = String.class))
	})
	@GetMapping("extract-thumbnail")
	public ResponseEntity<PlaceThumbnailResponse> extractThumbnails(@RequestParam String sourceUrl) {
		return ResponseEntity.ok(placeThumbnailExtractService.extractThumbnailUrl(sourceUrl));
	}

}
