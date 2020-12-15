package com.hst.triptale.content.trip.entity;

import java.time.LocalDate;
import java.time.Period;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * @author hyungyu.lee@nhn.com
 */
@Getter
@NoArgsConstructor
@AllArgsConstructor(staticName = "of")
@EqualsAndHashCode
@Embeddable
public class TravelPeriod {

	@Column(name = "TRIP_START_DATE")
	private LocalDate startAt;

	@Column(name = "TRIP_END_DATE")
	private LocalDate endAt;

	public int getDays() {
		return Period.between(this.startAt, this.endAt).getDays() + 1;
	}

}
