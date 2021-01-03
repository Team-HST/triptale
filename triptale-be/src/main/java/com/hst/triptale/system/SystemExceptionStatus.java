package com.hst.triptale.system;

import com.hst.triptale.exceptionhandling.model.BusinessExceptionStatus;

/**
 * @author dlgusrb0808@gmail.com
 */
public enum SystemExceptionStatus implements BusinessExceptionStatus {
	UNKNOWN_SYSTEM_ERROR(9000, "알 수 없는 오류가 발생했습니다. 불편을 드려 죄송합니다.")
	;

	private final int statusCode;
	private final String message;

	SystemExceptionStatus(int statusCode, String message) {
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
