package com.hst.triptale.content.place.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;

/**
 * @author dlgusrb0808@gmail.com
 */
@Getter
public class KakaoPlaceDetailModel {
	private BasicInfo basicInfo;

	@Getter
	public static class BasicInfo {
		@JsonProperty("mainphotourl")
		private String mainPhotoUrl;
	}
}
