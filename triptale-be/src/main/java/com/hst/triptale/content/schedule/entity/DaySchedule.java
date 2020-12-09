package com.hst.triptale.content.schedule.entity;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.hst.triptale.content.trip.entity.Trip;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * @author dlgusrb0808@gmail.com
 */
@NoArgsConstructor
@Getter
@Entity
@Table(name = "DAY_SKED")
public class DaySchedule {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "DAY_SKED_NO")
	private Long no;

	@Column(name = "DAY_SKED_ORDER")
	private Integer order;

	@Column(name = "DAY_SKED_DESC")
	private String description;

	@ManyToOne
	@JoinColumn(name = "TRIP_NO", nullable = false)
	private Trip trip;

	@Builder
	public DaySchedule(Integer order, String description, Trip trip) {
		this.order = order;
		this.description = description;
		this.trip = trip;
	}

	public LocalDate getScheduleDate() {
		long dayIndex = this.order - 1L;
		return this.trip.getStartAt().plusDays(dayIndex);
	}

	public void changeDescription(String description) {
		this.description = description;
	}
}
