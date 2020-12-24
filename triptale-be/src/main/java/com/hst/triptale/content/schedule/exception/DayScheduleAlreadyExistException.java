package com.hst.triptale.content.schedule.exception;

import org.springframework.http.HttpStatus;

import com.hst.triptale.exceptionhandling.exception.ApplicationException;

/**
 * @author dlgusrb0808@gmail.com
 */
public class DayScheduleAlreadyExistException extends ApplicationException {

	public DayScheduleAlreadyExistException() {
		super(HttpStatus.CONFLICT, DayScheduleBusinessExceptionStatus.DAY_SCHEDULE_ALREADY_EXIST);
	}

}
