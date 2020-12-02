package com.hst.triptale.content.trip.ui.response;

import java.time.LocalDate;

import com.hst.triptale.content.schedule.entity.DaySchedule;
import com.hst.triptale.content.trip.entity.Trip;

import lombok.Builder;
import lombok.Getter;

/**
 * @author dlgusrb0808@gmail.com
 */
@Getter
@Builder
public class DayScheduleResponse {
	private final Long tripNo;
	private final Long no;
	private final Integer order;
	private final String description;
	private final LocalDate date;

	public static DayScheduleResponse from(DaySchedule daySchedule) {
		return DayScheduleResponse.builder()
			.no(daySchedule.getNo())
			.order(daySchedule.getOrder())
			.description(daySchedule.getDescription())
			.tripNo(daySchedule.getTrip().getNo())
			.date(daySchedule.getScheduleDate())
			.build();
	}
}
