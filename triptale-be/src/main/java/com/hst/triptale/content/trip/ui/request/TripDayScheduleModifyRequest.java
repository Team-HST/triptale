package com.hst.triptale.content.trip.ui.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;

/**
 * @author dlgusrb0808@gmail.com
 */
@Getter
public class TripDayScheduleModifyRequest {
	@Schema(title = "여행 일차 설명", description = "여행 일차 설명", required = true)
	private String description;
}
