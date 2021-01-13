package com.hst.triptale.content.place.ui.request;

import java.time.LocalTime;

import com.hst.triptale.base.ui.request.BaseModifyingRequest;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;

/**
 * @author dlgusrb0808@gmail.com
 */
@Getter
public class PlaceModifyingRequest extends BaseModifyingRequest {
	@Schema(title = "장소 이름", description = "장소 이름(사용자가 적는 장소 이름)", required = true)
	private String title;
	@Schema(title = "장소 설명", description = "장소 설명", required = true)
	private String description;
	@Schema(title = "장소 정보 URL", description = "장소 정보 URL(Kakao Place)", required = true)
	private String placeInfoUrl;
	@Schema(title = "장소명", description = "장소명 (가게, 숙소 등 이름)", required = true)
	private String name;
	@Schema(title = "장소 타입", description = "1: 여행지, 2: 숙소", required = true)
	private Integer placeType;
	@Schema(title = "장소 시작 시간", description = "hh:mm", required = true)
	private LocalTime startAt;
	@Schema(title = "장소 종료 시간", description = "장소 종료 시간", required = true)
	private LocalTime endAt;
	@Schema(title = "장소 위도", description = "장소 위도", required = true)
	private Double latitude;
	@Schema(title = "장소 경도", description = "장소 경도", required = true)
	private Double longitude;
	@Schema(title = "여행 일차 번호", description = "여행 일차 번호", required = true)
	private Long dayScheduleNo;
}
