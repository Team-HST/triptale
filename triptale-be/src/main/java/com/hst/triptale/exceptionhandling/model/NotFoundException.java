package com.hst.triptale.exceptionhandling.model;

import org.springframework.http.HttpStatus;

/**
 * @author dlgusrb0808@gmail.com
 */
public class NotFoundException extends ApplicationException {

	public NotFoundException(String message) {
		super(HttpStatus.NOT_FOUND, message);
	}

}
