package com.hst.triptale.content.place.service;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.exception.ExceptionUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.w3c.dom.stylesheets.LinkStyle;

import com.hst.triptale.content.place.model.KakaoPlaceDetailModel;
import com.hst.triptale.content.place.ui.response.PlaceThumbnailResponse;

import lombok.extern.slf4j.Slf4j;

/**
 * @author dlgusrb0808@gmail.com
 */
@Slf4j
@Service
public class PlaceThumbnailExtractService {
	private static final String PLACE_URL_PREFIX = "https://place.map.kakao.com/main/v";
	private final RestTemplate restTemplate = new RestTemplate();

	/**
	 * 썸네일 이미지 추출 (다중)
	 * @param sourceUrls 대상 URL 목록
	 * @return 썸네일 목록
	 */
	public List<PlaceThumbnailResponse> extractThumbnailUrls(List<String> sourceUrls) {
		List<PlaceThumbnailResponse> extractedUrls = new ArrayList<>();
		sourceUrls.forEach(sourceUrl -> extractedUrls.add(extractThumbnailUrl(sourceUrl)));
		return extractedUrls;
	}

	/**
	 * 썸네일 이미지 추출
	 * @param sourceUrl 대상 URL
	 * @return 썸네일 이미지 URL
	 */
	public PlaceThumbnailResponse extractThumbnailUrl(String sourceUrl) {
		String requestUrl = String.format("%s/%s", PLACE_URL_PREFIX, getPlaceId(sourceUrl));
		KakaoPlaceDetailModel model = null;
		try {
			model = restTemplate.getForEntity(requestUrl, KakaoPlaceDetailModel.class).getBody();
		} catch (Exception e) {
			log.error(ExceptionUtils.getStackTrace(e));
		}
		if (model == null || model.getBasicInfo() == null) {
			log.warn("장소 썸네일을 가져올 수 없습니다. sourceUrl: {}", sourceUrl);
			return null;
		}
		return PlaceThumbnailResponse.from(model.getBasicInfo().getMainPhotoUrl());
	}

	private String getPlaceId(String sourceUrl) {
		String[] token = sourceUrl.split("/");
		return token[token.length - 1];
	}

}
