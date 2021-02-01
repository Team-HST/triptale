package com.hst.triptale.content.place.ui.response;

import java.time.LocalTime;

import com.hst.triptale.content.place.entity.Place;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;

/**
 * @author dlgusrb0808@gmail.com
 */
@Getter
@Builder(access = AccessLevel.PRIVATE)
public class PlaceResponse {
	private final Long placeNo;
	private final String title;
	private final String description;
	private final String name;
	private final String thumbnailUrl;
	private final String infoUrl;
	private final String address;
	private final int type;
	private final LocalTime startAt;
	private final LocalTime endAt;
	private final Double latitude;
	private final Double longitude;

	public static PlaceResponse from(Place place) {
		return PlaceResponse.builder()
			.placeNo(place.getNo())
			.title(place.getTitle())
			.description(place.getDescription())
			.name(place.getName())
			.thumbnailUrl(place.getThumbnailUrl())
			.infoUrl(place.getInfoUrl())
			.address(place.getAddress())
			.type(place.getType().getType())
			.startAt(place.getStartAt())
			.endAt(place.getEndAt())
			.latitude(place.getLocation().getLatitude())
			.longitude(place.getLocation().getLongitude())
			.build();
	}
}
