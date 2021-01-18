package com.hst.triptale.content.place.entity;

import java.time.LocalTime;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.hst.triptale.content.schedule.entity.DaySchedule;
import com.hst.triptale.content.trip.entity.Location;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * @author dlgusrb0808@gmail.com
 */
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "PLACE")
public class Place {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "PLACE_NO")
	private Long no;

	@Column(name = "PLACE_TITLE")
	private String title;

	@Column(name = "PLACE_NM")
	private String name;

	@Column(name = "PLACE_DESC")
	private String description;

	@Column(name = "PLACE_THUMBNAIL_URL")
	private String thumbnailUrl;

	@Column(name = "PLACE_TYPE")
	@Convert(converter = PlaceType.Converter.class)
	private PlaceType type;

	@Column(name = "PLACE_START_TIME")
	private LocalTime startAt;

	@Column(name = "PLACE_END_TIME")
	private LocalTime endAt;

	@Embedded
	private Location location;

	@ManyToOne
	@JoinColumn(name = "DAY_SCHEDULE_NO", nullable = false)
	private DaySchedule daySchedule;

	@Builder
	public Place(String title, String description, String name, String thumbnailUrl,
		PlaceType type, LocalTime startAt, LocalTime endAt, Location location,
		DaySchedule daySchedule) {
		this.title = title;
		this.description = description;
		this.name = name;
		this.thumbnailUrl = thumbnailUrl;
		this.type = type;
		this.startAt = startAt;
		this.endAt = endAt;
		this.location = location;
		this.daySchedule = daySchedule;
	}

	public void changeTitle(String title) {
		this.title = title;
	}

	public void changeName(String name) {
		this.name = name;
	}

	public void changeDescription(String description) {
		this.description = description;
	}

	public void changeThumbnailUrl(String thumbnailUrl) {
		this.thumbnailUrl = thumbnailUrl;
	}

	public void changeType(PlaceType type) {
		this.type = type;
	}

	public void changeLocation(Location location) {
		this.location = location;
	}

	public void changeStartAt(LocalTime startAt) {
		this.startAt = startAt;
	}

	public void changeEndAt(LocalTime endAt) {
		this.endAt = endAt;
	}

}
