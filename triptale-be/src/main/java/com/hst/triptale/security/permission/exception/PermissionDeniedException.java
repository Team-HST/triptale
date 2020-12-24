package com.hst.triptale.security.permission.exception;

import org.springframework.http.HttpStatus;

import com.hst.triptale.exceptionhandling.exception.ApplicationException;

/**
 * @author dlgusrb0808@gmail.com
 */
public class PermissionDeniedException extends ApplicationException {

	public PermissionDeniedException() {
		super(HttpStatus.FORBIDDEN, PermissionExceptionStatus.PERMISSION_DENIED);
	}

}
