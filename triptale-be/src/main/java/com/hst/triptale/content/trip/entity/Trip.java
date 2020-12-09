package com.hst.triptale.content.trip.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Period;

import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.hst.triptale.content.ContentResource;
import com.hst.triptale.content.schedule.entity.DaySchedule;
import com.hst.triptale.content.schedule.entity.DaySchedules;
import com.hst.triptale.content.schedule.exception.DayScheduleExceedException;
import com.hst.triptale.content.trip.ui.request.TripModifyingRequest;
import com.hst.triptale.content.user.entity.User;

import lombok.Getter;

/**
 * @author dlgusrb0808@gmail.com
 */
@Getter
@Entity
@Table(name = "TRIP")
@EntityListeners(AuditingEntityListener.class)
public class Trip implements ContentResource {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "TRIP_NO")
	private Long no;

	@Column(name = "TRIP_TITLE")
	private String title;

	@Column(name = "TRIP_DESC")
	private String description;

	@Column(name = "TRIP_AREA")
	private String area;

	@Embedded
	private Location location;

	@Column(name = "TRIP_THUMBNAIL_NO")
	private Long thumbnailFileNo;

	@Column(name = "TRIP_START_DATE")
	private LocalDate startAt;

	@Column(name = "TRIP_END_DATE")
	private LocalDate endAt;

	@Column(name = "TRIP_MATERIALS")
	private String materials;

	@CreatedDate
	@Column(name = "REG_DATE")
	private LocalDateTime registeredAt;

	@ManyToOne
	@JoinColumn(name = "REG_USER_NO", nullable = false)
	private User registrar;

	@Embedded
	private DaySchedules daySchedules = new DaySchedules();
 
	@Override
	public User getResourceOwner() {
		return this.registrar;
	}

	public int getTripPeriodDays() {
		return Period.between(this.startAt, this.endAt).getDays() + 1;
	}

	public DaySchedule addNewDaySchedule(String description) {
		if (getTripPeriodDays() < daySchedules.getNextOrder()) {
			throw new DayScheduleExceedException();
		}
		DaySchedule appendedDaySchedule = DaySchedule.builder()
			.trip(this)
			.order(daySchedules.getNextOrder())
			.description(description)
			.build();
		this.daySchedules.addDaySchedule(appendedDaySchedule);
		return appendedDaySchedule;
	}

	public void changeContent(TripModifyingRequest request) {
		this.title = request.getTitle();
		this.description = request.getDescription();
		this.area = request.getArea();
		this.location = Location.of(request.getLatitude(), request.getLongitude());
		this.thumbnailFileNo = request.getThumbnailFileNo();
		this.startAt = request.getStartAt();
		this.endAt = request.getEndAt();
		this.materials = request.getMaterials();
	}

	public static Trip createTrip(TripModifyingRequest request, User registrar) {
		Trip trip = new Trip();
		trip.title = request.getTitle();
		trip.description = request.getDescription();
		trip.area = request.getArea();
		trip.location = Location.of(request.getLatitude(), request.getLongitude());
		trip.thumbnailFileNo = request.getThumbnailFileNo();
		trip.startAt = request.getStartAt();
		trip.endAt = request.getEndAt();
		trip.materials = request.getMaterials();
		trip.registrar = registrar;
		return trip;
	}
}
