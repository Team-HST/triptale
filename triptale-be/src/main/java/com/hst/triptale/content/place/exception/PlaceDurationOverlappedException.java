package com.hst.triptale.content.place.exception;

import org.springframework.http.HttpStatus;

import com.hst.triptale.exceptionhandling.exception.ApplicationException;

/**
 * @author dlgusrb0808@gmail.com
 */
public class PlaceDurationOverlappedException extends ApplicationException {

	public PlaceDurationOverlappedException() {
		super(HttpStatus.CONFLICT, PlaceBusinessExceptionStatus.PLACE_DURATION_OVERLAPPED);
	}

}
