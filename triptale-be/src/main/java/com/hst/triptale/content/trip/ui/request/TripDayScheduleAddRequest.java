package com.hst.triptale.content.trip.ui.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;

/**
 * @author dlgusrb0808@gmail.com
 */
@Getter
public class TripDayScheduleAddRequest {
	@Schema(title = "여행 일차 순번", description = "여행 일차 순번", required = true)
	private int order;
	@Schema(title = "여행 일차 설명", description = "여행 일차 설명", required = true)
	private String description;
}
