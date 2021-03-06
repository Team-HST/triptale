package com.hst.triptale.content.trip.ui.response;

import java.time.LocalDate;

import com.hst.triptale.content.place.ui.response.PlaceListResponse;
import com.hst.triptale.content.schedule.entity.DaySchedule;

import lombok.Builder;
import lombok.Getter;

/**
 * @author dlgusrb0808@gmail.com
 */
@Getter
@Builder
public class DayScheduleResponse {
	private final Long no;
	private final Integer order;
	private final String description;
	private final String colorCode;
	private final LocalDate date;
	private final PlaceListResponse places;

	public static DayScheduleResponse from(DaySchedule daySchedule) {
		return DayScheduleResponse.builder()
			.no(daySchedule.getNo())
			.order(daySchedule.getOrder())
			.description(daySchedule.getDescription())
			.colorCode(daySchedule.getColorCode())
			.date(daySchedule.getScheduleDate())
			.places(PlaceListResponse.of(daySchedule, daySchedule.getPlaces()))
			.build();
	}
}
