package com.hst.triptale.content.place.exception;

import com.hst.triptale.exceptionhandling.model.BusinessExceptionStatus;

/**
 * @author dlgusrb0808@gmail.com
 */
public enum PlaceBusinessExceptionStatus implements BusinessExceptionStatus {
	PLACE_NOT_FOUND(5000, "장소 정보가 존재하지 않습니다."),
	PLACE_DURATION_OVERLAPPED(5001, "장소 방문 기간이 겹칩니다."),
	;

	private final int statusCode;
	private final String message;

	PlaceBusinessExceptionStatus(int statusCode, String message) {
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
