package com.hst.triptale.content.trip.exception;

import com.hst.triptale.exceptionhandling.model.BusinessExceptionStatus;

/**
 * @author dlgusrb0808@gmail.com
 */
public enum TripBusinessExceptionStatus implements BusinessExceptionStatus {
	TRIP_NOT_FOUND(3000, "여행 정보가 존재하지 않습니다.")
	;

	private final int statusCode;
	private final String message;

	TripBusinessExceptionStatus(int statusCode, String message) {
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
