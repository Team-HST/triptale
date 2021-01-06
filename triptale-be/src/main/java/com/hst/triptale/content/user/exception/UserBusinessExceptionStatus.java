package com.hst.triptale.content.user.exception;

import com.hst.triptale.exceptionhandling.model.BusinessExceptionStatus;

/**
 * @author dlgusrb0808@gmail.com
 */
public enum UserBusinessExceptionStatus implements BusinessExceptionStatus {
	USER_NOT_FOUND(1000, "사용자 정보가 존재하지 않습니다.")
	;

	private final int statusCode;
	private final String message;

	UserBusinessExceptionStatus(int statusCode, String message) {
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
