package com.hst.triptale.content.place.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
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
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * @author dlgusrb0808@gmail.com
 */
@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
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
	private int type;

	@Column(name = "PLACE_START_TIME")
	private LocalDateTime startAt;

	@Column(name = "PLACE_END_TIME")
	private LocalDateTime endAt;

	@Embedded
	private Location location;

	@ManyToOne
	@JoinColumn(name = "DAY_SCHEDULE_NO", nullable = false)
	private DaySchedule daySchedule;

}
