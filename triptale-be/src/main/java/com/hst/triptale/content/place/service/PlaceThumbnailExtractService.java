package com.hst.triptale.content.place.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.hst.triptale.content.place.model.KakaoPlaceDetailModel;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * @author dlgusrb0808@gmail.com
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class PlaceThumbnailExtractService {
	private static final String PLACE_URL_PREFIX = "https://place.map.kakao.com/main/v";
	private final RestTemplate restTemplate;

	/**
	 * 썸네일 이미지 추출
	 * @param sourceUrl 대상 URL
	 * @return 썸네일 이미지 URL
	 */
	public String extractThumbnailUrl(String sourceUrl) {
		String requestUrl = String.format("%s/%s", PLACE_URL_PREFIX, getPlaceId(sourceUrl));
		KakaoPlaceDetailModel model = restTemplate.getForEntity(requestUrl, KakaoPlaceDetailModel.class).getBody();
		if (model == null || model.getBasicInfo() == null) {
			log.warn("장소 썸네일을 가져올 수 없습니다. sourceUrl: {}", sourceUrl);
			return null;
		}
		return model.getBasicInfo().getMainPhotoUrl();
	}

	private String getPlaceId(String sourceUrl) {
		String[] token = sourceUrl.split("/");
		return token[token.length - 1];
	}

	public static void main(String[] args) {
		PlaceThumbnailExtractService service = new PlaceThumbnailExtractService(new RestTemplate());
		System.out.println(service.extractThumbnailUrl("https://place.map.kakao.com/16096439"));
	}

}
