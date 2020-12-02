package com.hst.triptale.content.trip.ui.response;

import com.hst.triptale.content.schedule.entity.DaySchedule;

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

	public static DayScheduleResponse from(DaySchedule daySchedule) {
		return DayScheduleResponse.builder()
			.no(daySchedule.getNo())
			.order(daySchedule.getOrder())
			.description(daySchedule.getDescription())
			.tripNo(daySchedule.getTrip().getNo())
			.build();
	}
}
