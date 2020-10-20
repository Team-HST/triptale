package com.hst.triptale.exceptionhandling.model;

import org.springframework.http.HttpStatus;

/**
 * @author dlgusrb0808@gmail.com
 */
public class InvalidParameterException extends ApplicationException {

	public InvalidParameterException(String message) {
		super(HttpStatus.BAD_REQUEST, message);
	}

}
