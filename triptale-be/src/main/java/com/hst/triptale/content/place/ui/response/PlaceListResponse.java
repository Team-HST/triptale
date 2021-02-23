package com.hst.triptale.content.place.ui.response;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.hst.triptale.content.place.entity.Place;
import com.hst.triptale.content.schedule.entity.DaySchedule;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * @author dlgusrb0808@gmail.com
 */
@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class PlaceListResponse {
	private final Long dayScheduleNo;
	private final List<PlaceResponse> places;

	public static PlaceListResponse of(DaySchedule daySchedule, List<Place> places) {
		List<PlaceResponse> placeList = places.stream().map(PlaceResponse::from).collect(Collectors.toList());
		return new PlaceListResponse(daySchedule.getNo(), placeList);
	}
}
