package com.hst.triptale.content.trip.exception;

import com.hst.triptale.exceptionhandling.model.NotFoundException;

/**
 * @author dlgusrb0808@gmail.com
 */
public class TripNotFoundException extends NotFoundException {

	public TripNotFoundException(Long invalidTripNo) {
		super("여행 정보가 존재하지 않습니다.");
		this.addAttribute("tripNo", invalidTripNo);
	}

}
