package com.hst.triptale.content.schedule.entity;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Embeddable;
import javax.persistence.OneToMany;

import com.hst.triptale.content.schedule.exception.DayScheduleAlreadyExistException;

import lombok.Getter;

/**
 * @author hyungyu.lee@nhn.com
 */
@Embeddable
@Getter
public class DaySchedules {

	@OneToMany(mappedBy = "trip")
	private final Set<DaySchedule> schedules = new HashSet<>();

	public void addDaySchedule(DaySchedule daySchedule) {
		if (isExistOrder(daySchedule.getOrder())) {
			throw new DayScheduleAlreadyExistException()
				.addAttribute("order", daySchedule.getOrder());
		}
		this.schedules.add(daySchedule);
	}

	public int getNextOrder() {
		return this.schedules.size() + 1;
	}

	private boolean isExistOrder(int order) {
		return this.schedules.stream()
			.anyMatch(daySchedule -> daySchedule.getOrder().equals(order));
	}

}
