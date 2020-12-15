package com.hst.triptale.content.trip.entity;

import java.time.LocalDateTime;

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
import com.hst.triptale.content.schedule.exception.DayScheduleEmptyException;
import com.hst.triptale.content.schedule.exception.DayScheduleExceedException;
import com.hst.triptale.content.user.entity.User;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * @author dlgusrb0808@gmail.com
 */
@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
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

	@Embedded
	private TravelPeriod travelPeriod;

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

	@Builder
	private Trip(String title, String description, String area, Location location, TravelPeriod travelPeriod, User registrar) {
		this.title = title;
		this.description = description;
		this.area = area;
		this.location = location;
		this.travelPeriod = travelPeriod;
		this.registrar = registrar;
	}

	@Override
	public User getResourceOwner() {
		return this.registrar;
	}

	public void changeTitle(String title) {
		this.title = title;
	}

	public void changeDescription(String description) {
		this.description = description;
	}

	public void changeArea(String area) {
		this.area = area;
	}

	public void changeLocation(Location location) {
		this.location = location;
	}

	public void changeTravelPeriod(TravelPeriod travelPeriod) {
		this.travelPeriod = travelPeriod;
	}

	public void changeThumbnailFileNo(Long thumbnailFileNo) {
		this.thumbnailFileNo = thumbnailFileNo;
	}

	public void changeMaterials(String materials) {
		this.materials = materials;
	}

	public DaySchedule addNewDaySchedule(String description) {
		if (this.travelPeriod.getDays() < daySchedules.getNextOrder()) {
			throw new DayScheduleExceedException();
		}
		DaySchedule appendedDaySchedule = DaySchedule.builder()
			.trip(this)
			.order(daySchedules.getNextOrder())
			.description(description)
			.build();
		this.daySchedules.addSchedule(appendedDaySchedule);
		return appendedDaySchedule;
	}

	public void deleteDaySchedule(DaySchedule schedule) {
		if (daySchedules.isEmpty()) {
			throw new DayScheduleEmptyException(this.no);
		}
		this.daySchedules.deleteSchedule(schedule);
	}
}
