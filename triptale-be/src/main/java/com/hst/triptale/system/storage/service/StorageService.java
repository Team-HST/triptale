package com.hst.triptale.system.storage.service;

import org.apache.commons.lang3.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.hst.triptale.system.storage.exception.StorageException;
import com.hst.triptale.system.storage.model.FileBinaryData;

/**
 * @author dlgusrb0808@gmail.com
 */
public interface StorageService<T> {

	/**
	 * 웹에서 서버로 파일 업로드
	 * @param uploadFile 업로드 파일
	 * @return 업로드된 파일 식별자
	 */
	T uploadFile(MultipartFile uploadFile);

	/**
	 * 업로드한 파일이 null이 아닌지 검사
	 */
	default void assertUploadFileIsNotNull(MultipartFile uploadFile) {
		if (uploadFile == null || uploadFile.isEmpty()) {
			throw new StorageException("업로드한 파일이 없습니다.");
		}
		if (StringUtils.isBlank(uploadFile.getOriginalFilename())) {
			throw new StorageException("업로드한 파일이 없습니다.");
		}
	}

	/**
	 * 파일 바이너리 데이터 획득
	 * @param identifier 파일 식별자
	 * @return 파일 바이너리 데이터
	 */
	default FileBinaryData getBinaryData(T identifier) {
		throw new UnsupportedOperationException("지원하지 않는 방식입니다.");
	}

	/**
	 * 파일 다운로드 URL 획득
	 * @param identifier 파일 번호
	 * @return 다운로드 url
	 */
	default String getDownloadURL(T identifier) {
		throw new UnsupportedOperationException("지원하지 않는 방식입니다.");
	}
	
}
