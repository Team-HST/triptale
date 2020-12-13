package com.hst.triptale.content.schedule.exception;

import org.springframework.http.HttpStatus;

import com.hst.triptale.exceptionhandling.model.ApplicationException;

/**
 * @author dlgusbr0808@gmail.com
 */
public class DayScheduleEmptyException extends ApplicationException {

	public DayScheduleEmptyException(long tripNo) {
		super(HttpStatus.NOT_FOUND, "여행에 일차가 존재하지 않습니다.");
		this.addAttribute("tripNo", tripNo);
	}

}
