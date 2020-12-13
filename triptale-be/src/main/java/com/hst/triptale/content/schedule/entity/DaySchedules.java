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

	public void addSchedule(DaySchedule schedule) {
		if (isExistOrder(schedule.getOrder())) {
			throw new DayScheduleAlreadyExistException()
				.addAttribute("order", schedule.getOrder());
		}
		this.schedules.add(schedule);
	}

	public int getNextOrder() {
		return this.schedules.size() + 1;
	}

	public boolean isEmpty() {
		return this.schedules.isEmpty();
	}

	private boolean isExistOrder(int order) {
		return this.schedules.stream()
			.anyMatch(daySchedule -> daySchedule.getOrder().equals(order));
	}

	public void deleteSchedule(DaySchedule schedule) {
		this.schedules.remove(schedule);
		this.rearrangeOrder();
	}

	private void rearrangeOrder() {
		int order = 1;
		for (DaySchedule schedule : this.schedules) {
			schedule.changeOrder(order++);
		}
	}
}
