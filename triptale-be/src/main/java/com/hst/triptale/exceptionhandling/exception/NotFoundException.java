package com.hst.triptale.exceptionhandling.exception;

import org.springframework.http.HttpStatus;

import com.hst.triptale.exceptionhandling.model.BusinessExceptionStatus;

/**
 * @author dlgusrb0808@gmail.com
 */
public class NotFoundException extends ApplicationException {

	public NotFoundException(BusinessExceptionStatus exceptionStatus) {
		super(HttpStatus.NOT_FOUND, exceptionStatus);
	}

}
