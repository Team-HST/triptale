package com.hst.triptale.exceptionhandling.model;

import org.springframework.http.HttpStatus;

/**
 * @author dlgusrb0808@gmail.com
 */
public class AlreadyExistsException extends ApplicationException {

	public AlreadyExistsException(String message) {
		super(HttpStatus.CONFLICT, message);
	}

}
