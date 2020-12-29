package com.hst.triptale.content.schedule.exception;

import org.springframework.http.HttpStatus;

import com.hst.triptale.exceptionhandling.exception.ApplicationException;

/**
 * @author hyungyu.lee@nhn.com
 */
public class DayScheduleExceedException extends ApplicationException {

	public DayScheduleExceedException() {
		super(HttpStatus.CONFLICT, DayScheduleBusinessExceptionStatus.DAY_SCHEDULE_EXCEED);
	}

}
