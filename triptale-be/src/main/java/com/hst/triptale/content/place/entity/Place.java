package com.hst.triptale.content.place.entity;

import java.time.LocalDateTime;
import java.time.LocalTime;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.FetchType;
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
	public Place(String name, String description, String thumbnailUrl,
		PlaceType type, LocalTime startAt, LocalTime endAt, Location location,
		DaySchedule daySchedule) {
		this.name = name;
		this.description = description;
		this.thumbnailUrl = thumbnailUrl;
		this.type = type;
		this.startAt = startAt;
		this.endAt = endAt;
		this.location = location;
		this.daySchedule = daySchedule;
	}
}
