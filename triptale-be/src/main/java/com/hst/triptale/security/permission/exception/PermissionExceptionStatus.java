package com.hst.triptale.security.permission.exception;

import com.hst.triptale.exceptionhandling.model.BusinessExceptionStatus;

/**
 * @author dlgusrb0808@gmail.com
 */
public enum PermissionExceptionStatus implements BusinessExceptionStatus {
	PERMISSION_DENIED(2000, "컨텐츠 리소스 접근 권한이 없습니다.")
	;

	private final int statusCode;
	private final String message;

	PermissionExceptionStatus(int statusCode, String message) {
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
