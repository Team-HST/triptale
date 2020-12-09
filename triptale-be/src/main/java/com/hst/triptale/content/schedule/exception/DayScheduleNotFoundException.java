package com.hst.triptale.content.schedule.exception;

import org.springframework.http.HttpStatus;

import com.hst.triptale.exceptionhandling.model.ApplicationException;

/**
 * @author hyungyu.lee@nhn.com
 */
public class DayScheduleNotFoundException extends ApplicationException {

	public DayScheduleNotFoundException(Long invalidDayScheduleNo) {
		super(HttpStatus.NOT_FOUND, "여행 일차가 존재하지 않습니다.");
		this.addAttribute("dayScheduleNo", invalidDayScheduleNo);
	}
}
