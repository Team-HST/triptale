package com.hst.triptale.content.trip.ui.request;

import java.time.LocalDate;

import com.hst.triptale.base.ui.request.BaseModifyingRequest;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;

/**
 * @author dlgusrb0808@gmail.com
 */
@Getter
public class TripModifyingRequest extends BaseModifyingRequest<Long> {
	@Schema(title = "여행 제목", description = "여행 제목", required = true)
	private String title;
	@Schema(title = "여행 설명", description = "여행 설명", required = true)
	private String description;
	@Schema(title = "여행 지역", description = "여행 지역", example = "경기도 가평군", required = true)
	private String area;
	@Schema(title = "여행지 위도", description = "여행지 위도", required = true)
	private Double latitude;
	@Schema(title = "여행지 경도", description = "여행지 경도", required = true)
	private Double longitude;
	@Schema(title = "썸네일 파일번호", description = "썸네일 파일번호", required = true)
	private Long thumbnailFileNo;
	@Schema(title = "여행 시작일", description = "여행 시작일", example = "yyyy-MM-dd", required = true)
	private LocalDate startAt;
	@Schema(title = "여행 종료일", description = "여행 종료일", example = "yyyy-MM-dd", required = true)
	private LocalDate endAt;
	@Schema(title = "여행 준비물", description = "여행 준비물")
	private String materials;
}
