package com.hst.triptale.content.schedule.exception;

import com.hst.triptale.exceptionhandling.exception.NotFoundException;

/**
 * @author dlgusrb0808@gmail.com
 */
public class DayScheduleNotFoundException extends NotFoundException {

	public DayScheduleNotFoundException(Long invalidDayScheduleNo) {
		super(DayScheduleBusinessExceptionStatus.DAY_SCHEDULE_NOT_FOUND);
		this.addAttribute("dayScheduleNo", invalidDayScheduleNo);
	}
}
