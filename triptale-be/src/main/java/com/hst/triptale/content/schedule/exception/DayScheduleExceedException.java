package com.hst.triptale.content.schedule.exception;

import org.springframework.http.HttpStatus;

import com.hst.triptale.exceptionhandling.model.ApplicationException;

/**
 * @author hyungyu.lee@nhn.com
 */
public class DayScheduleExceedException extends ApplicationException {

	public DayScheduleExceedException() {
		super(HttpStatus.CONFLICT, "더 이상 일차를 등록할 수 없습니다.");
	}

}
