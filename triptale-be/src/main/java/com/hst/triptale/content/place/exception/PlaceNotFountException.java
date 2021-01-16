package com.hst.triptale.content.place.exception;

import org.springframework.http.HttpStatus;

import com.hst.triptale.exceptionhandling.exception.ApplicationException;

/**
 * @author dlgusrb0808@gmail.com
 */
public class PlaceNotFountException extends ApplicationException {

	public PlaceNotFountException() {
		super(HttpStatus.NOT_FOUND, PlaceBusinessExceptionStatus.PLACE_NOT_FOUND);
	}

}
