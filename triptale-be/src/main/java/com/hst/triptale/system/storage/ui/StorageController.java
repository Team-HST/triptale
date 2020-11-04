package com.hst.triptale.system.storage.ui;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.hst.triptale.configuration.ApplicationConstants;
import com.hst.triptale.system.storage.model.FileBinaryData;
import com.hst.triptale.system.storage.service.StorageService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

/**
 * @author dlgusrb0808@gmail.com
 */
@Tag(name = "스토리지 API", description = "스토리지 관련 API")
@RequiredArgsConstructor
@RestController
@RequestMapping(ApplicationConstants.APIGroups.SYSTEM_API + "/storage")
public class StorageController<T extends Long> {

	private final StorageService<T> storageService;

	@Operation(summary = "파일 업로드", parameters = {
		@Parameter(name = "file", in = ParameterIn.QUERY, schema = @Schema(implementation = MultipartFile.class))
	})
	@PostMapping("/upload")
	public ResponseEntity<T> uploadFile(@RequestParam("file") MultipartFile file) {
		return ResponseEntity.ok(storageService.uploadFile(file));
	}

	@Operation(summary = "파일 바이너리 다운로드", parameters = {
		@Parameter(name = "fileNo", in = ParameterIn.PATH, schema = @Schema(implementation = Integer.class), required = true)
	})
	@GetMapping("/files/{fileNo}")
	public ResponseEntity<byte[]> downloadFile(@PathVariable T fileNo) {
		FileBinaryData binaryData = storageService.getBinaryData(fileNo);
		return ResponseEntity
			.status(HttpStatus.OK)
			.contentType(MediaType.parseMediaType(binaryData.getContentType()))
			.body(binaryData.getData());
	}

}
