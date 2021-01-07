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
	private final String name;
	private final String description;
	private final String thumbnailUrl;
	private final int type;
	private final LocalTime startAt;
	private final LocalTime endAt;
	private final Double latitude;
	private final Double longitude;

	public static PlaceResponse from(Place place) {
		return PlaceResponse.builder()
			.placeNo(place.getNo())
			.name(place.getName())
			.description(place.getDescription())
			.thumbnailUrl(place.getThumbnailUrl())
			.type(place.getType().getType())
			.startAt(place.getStartAt())
			.endAt(place.getEndAt())
			.latitude(place.getLocation().getLatitude())
			.longitude(place.getLocation().getLongitude())
			.build();
	}
}
