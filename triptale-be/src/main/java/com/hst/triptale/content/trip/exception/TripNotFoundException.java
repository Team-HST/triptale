package com.hst.triptale.content.trip.exception;

import com.hst.triptale.exceptionhandling.exception.NotFoundException;

/**
 * @author dlgusrb0808@gmail.com
 */
public class TripNotFoundException extends NotFoundException {

	public TripNotFoundException(Long invalidTripNo) {
		super(TripBusinessExceptionStatus.TRIP_NOT_FOUND);
		this.addAttribute("tripNo", invalidTripNo);
	}

}
