package com.hst.triptale.system.storage.service.impl;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.hst.triptale.configuration.props.ApplicationProps;
import com.hst.triptale.system.storage.entity.StorageFile;
import com.hst.triptale.system.storage.exception.StorageException;
import com.hst.triptale.system.storage.exception.StorageFileNotFoundException;
import com.hst.triptale.system.storage.model.FileBinaryData;
import com.hst.triptale.system.storage.repository.StorageFileRepository;
import com.hst.triptale.system.storage.service.StorageService;
import com.hst.triptale.utils.FileUtils;

import lombok.extern.slf4j.Slf4j;

/**
 * 로컬 파일 시스템을 저장소로 사용하는 저장소 서비스
 * @author dlgusrb0808@gmail.com
 */
@Slf4j
@Service
@ConditionalOnProperty(prefix = "app", name = "file.storage", havingValue = "fs")
public class FileSystemStorageService implements StorageService<Long> {
	private final StorageFileRepository storageFileRepository;
	private final Path fileStoreDirectory;

	public FileSystemStorageService(StorageFileRepository storageFileRepository, ApplicationProps applicationProps) {
		this.storageFileRepository = storageFileRepository;
		this.fileStoreDirectory = Paths.get(applicationProps.getFile().getUploadDir()).toAbsolutePath().normalize();
		try {
			Files.createDirectories(fileStoreDirectory);
		} catch (IOException e) {
			throw new StorageException();
		}
	}

	@Override
	@Transactional
	public Long uploadFile(MultipartFile uploadFile) {
		assertUploadFileIsNotNull(uploadFile);

		String saveFileName = FileUtils.generateFileName(FileUtils.getExtension(uploadFile.getOriginalFilename()));
		Path saveFilePath = this.fileStoreDirectory.resolve(saveFileName);

		try {
			Files.copy(uploadFile.getInputStream(), saveFilePath, StandardCopyOption.REPLACE_EXISTING);
		} catch (IOException e) {
			throw new StorageException();
		}

		StorageFile storageFile = StorageFile.createStorageFile(saveFilePath.toString());
		storageFileRepository.save(storageFile);
		return storageFile.getNo();
	}

	@Override
	public FileBinaryData getBinaryData(Long fileNo) {
		String storageFilePath = storageFileRepository.findById(fileNo)
			.map(StorageFile::getName)
			.orElseThrow(() -> new StorageFileNotFoundException(fileNo));
		try {
			return FileBinaryData.of(Files.readAllBytes(Paths.get(storageFilePath)),
				FileUtils.detectFileMimeType(storageFilePath));
		} catch (IOException e) {
			throw new StorageException().addAttribute("fileNo", fileNo);
		}
	}

}
