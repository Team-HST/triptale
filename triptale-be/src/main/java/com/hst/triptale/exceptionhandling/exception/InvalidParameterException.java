package com.hst.triptale.exceptionhandling.exception;

import org.springframework.http.HttpStatus;

import com.hst.triptale.exceptionhandling.model.BusinessExceptionStatus;

/**
 * @author dlgusrb0808@gmail.com
 */
public class InvalidParameterException extends ApplicationException {

	public InvalidParameterException(BusinessExceptionStatus exceptionStatus) {
		super(HttpStatus.BAD_REQUEST, exceptionStatus);
	}

}
