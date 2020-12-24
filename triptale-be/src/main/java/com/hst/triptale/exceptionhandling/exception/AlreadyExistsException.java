package com.hst.triptale.exceptionhandling.exception;

import org.springframework.http.HttpStatus;

import com.hst.triptale.exceptionhandling.model.BusinessExceptionStatus;

/**
 * @author dlgusrb0808@gmail.com
 */
public class AlreadyExistsException extends ApplicationException {

	public AlreadyExistsException(BusinessExceptionStatus exceptionStatus) {
		super(HttpStatus.CONFLICT, exceptionStatus);
	}

}
