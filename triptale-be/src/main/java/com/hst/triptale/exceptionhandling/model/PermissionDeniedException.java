package com.hst.triptale.exceptionhandling.model;

import org.springframework.http.HttpStatus;

/**
 * @author dlgusrb0808@gmail.com
 */
public class PermissionDeniedException extends ApplicationException {

	public PermissionDeniedException(String message) {
		super(HttpStatus.FORBIDDEN, message);
	}

}
