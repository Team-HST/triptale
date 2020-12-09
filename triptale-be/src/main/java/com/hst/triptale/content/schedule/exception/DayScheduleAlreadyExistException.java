package com.hst.triptale.content.schedule.exception;

import org.springframework.http.HttpStatus;

import com.hst.triptale.exceptionhandling.model.ApplicationException;

/**
 * @author dlgusrb0808@gmail.com
 */
public class DayScheduleAlreadyExistException extends ApplicationException {

	public DayScheduleAlreadyExistException() {
		super(HttpStatus.CONFLICT, "해당 일차에 이미 일정이 존재합니다.");
	}

}
