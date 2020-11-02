package com.hst.triptale.utils;

import java.io.IOException;
import java.net.URLConnection;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

import org.apache.commons.lang3.StringUtils;

import lombok.experimental.UtilityClass;

/**
 * @author dlgusrb0808@gmail.com
 */
@UtilityClass
public class FileUtils {

	public static String generateFileName(String extension) {
		return UUID.randomUUID().toString().replace("-", "") + "." + extension;
	}

	public static String getExtension(String fileName) {
		if (!StringUtils.isEmpty(fileName)) {
			String[] fileTokens = fileName.split("\\.");
			return fileTokens[fileTokens.length - 1];
		}
		return "";
	}

	public String detectFileMimeType(String filePath) {
		Path path = Paths.get(filePath);
		String detectedMimeType = null;
		try {
			detectedMimeType = Files.probeContentType(path);
		} catch (IOException e) {
			// ignore
		}
		return detectedMimeType != null ? detectedMimeType : URLConnection.guessContentTypeFromName(filePath);
	}

}
