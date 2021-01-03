package com.hst.triptale.content.schedule.exception;

import com.hst.triptale.exceptionhandling.model.BusinessExceptionStatus;

/**
 * @author dlgusrb0808@gmail.com
 */
public enum DayScheduleBusinessExceptionStatus implements BusinessExceptionStatus {
	DAY_SCHEDULE_NOT_FOUND(4000, "여행 정보가 존재하지 않습니다."),
	DAY_SCHEDULE_EXCEED(4001, "더 이상 여행 일차를 등록할 수 없습니다."),
	DAY_SCHEDULE_ALREADY_EXIST(4002, "해당 일차에 이미 정보가 존재합니다."),
	;

	private final int statusCode;
	private final String message;

	DayScheduleBusinessExceptionStatus(int statusCode, String message) {
		this.statusCode = statusCode;
		this.message = message;
	}

	@Override
	public int getStatusCode() {
		return statusCode;
	}

	@Override
	public String getMessage() {
		return message;
	}
}
