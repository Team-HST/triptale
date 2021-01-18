package com.hst.triptale.content.schedule.entity;

import java.time.LocalDate;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;
import javax.persistence.Table;

import com.hst.triptale.content.place.entity.Place;
import com.hst.triptale.content.place.exception.PlaceDurationOverlappedException;
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

	@Column(name = "COLOR_CODE")
	private String colorCode;

	@ManyToOne
	@JoinColumn(name = "TRIP_NO", nullable = false)
	private Trip trip;

	@OneToMany(mappedBy = "daySchedule")
	@OrderBy("startAt")
	private List<Place> places;

	@Builder
	public DaySchedule(Integer order, String description, String colorCode, Trip trip) {
		this.order = order;
		this.description = description;
		this.colorCode = colorCode;
		this.trip = trip;
	}

	public List<Place> getPlaces() {
		return places;
	}

	public LocalDate getScheduleDate() {
		long dayIndex = this.order - 1L;
		return this.trip.getTravelPeriod().getStartAt().plusDays(dayIndex);
	}

	void changeOrder(int newOrder) {
		this.order = newOrder;
	}

	public void changeDescription(String description) {
		this.description = description;
	}

	public void changeColorCode(String colorCode) {
		this.colorCode = colorCode;
	}

	public void addPlace(Place newPlace) {
		checkPlaceOverlap(newPlace);
		this.places.add(newPlace);
	}

	public void checkPlaceOverlap(Place newPlace) {
		for (Place place : places) {
			if (!place.getNo().equals(newPlace.getNo()) &&
				place.getStartAt().isBefore(newPlace.getEndAt()) &&
				newPlace.getStartAt().isBefore(place.getEndAt())) {
				throw new PlaceDurationOverlappedException()
					.addAttribute("overlappedDuration", String.format("%s ~ %s", place.getStartAt(), place.getEndAt()));
			}
		}
	}
}
