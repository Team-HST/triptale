package com.hst.triptale.content.trip.ui.response;

import java.time.LocalDate;

import com.hst.triptale.content.trip.entity.Trip;

import lombok.Builder;
import lombok.Getter;

/**
 * @author dlgusrb0808@gmail.com
 */
@Getter
@Builder
public class TripResponse {
	private final Long no;
	private final String title;
	private final String description;
	private final String area;
	private final Double latitude;
	private final Double longitude;
	private final Long thumbnailFileNo;
	private final LocalDate startAt;
	private final LocalDate endAt;
	private final String materials;

	public static TripResponse from(Trip trip) {
		return TripResponse.builder()
			.no(trip.getNo())
			.title(trip.getTitle())
			.description(trip.getDescription())
			.area(trip.getArea())
			.latitude(trip.getLocation().getLatitude())
			.longitude(trip.getLocation().getLongitude())
			.thumbnailFileNo(trip.getThumbnailFileNo())
			.startAt(trip.getStartAt().toLocalDate())
			.endAt(trip.getEndAt().toLocalDate())
			.materials(trip.getMaterials())
			.build();
	}
}
