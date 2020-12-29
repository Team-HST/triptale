package com.hst.triptale.content.schedule.exception;

import com.hst.triptale.exceptionhandling.exception.NotFoundException;

/**
 * @author hyungyu.lee@nhn.com
 */
public class DayScheduleNotFoundException extends NotFoundException {

	public DayScheduleNotFoundException(Long invalidDayScheduleNo) {
		super(DayScheduleBusinessExceptionStatus.DAY_SCHEDULE_NOT_FOUND);
		this.addAttribute("dayScheduleNo", invalidDayScheduleNo);
	}
}
