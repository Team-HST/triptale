package com.hst.triptale.content.trip.ui.response;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import com.hst.triptale.content.schedule.entity.DaySchedule;
import com.hst.triptale.content.schedule.entity.DaySchedules;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * @author dlgusrb0808@gmail.com
 */
@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class DayScheduleListResponse {
	private Long tripNo;
	private List<DayScheduleResponse> daySchedules;

	public static DayScheduleListResponse of(Long tripNo, DaySchedules daySchedules) {
		List<DayScheduleResponse> dayScheduleList = daySchedules.getSchedules()
			.stream()
			.sorted(Comparator.comparing(DaySchedule::getOrder))
			.map(DayScheduleResponse::from)
			.collect(Collectors.toList());
		return new DayScheduleListResponse(tripNo, dayScheduleList);
	}
}
