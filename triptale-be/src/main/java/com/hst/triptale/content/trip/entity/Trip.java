package com.hst.triptale.content.trip.entity;

import java.time.LocalDate;
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
public class Trip {

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
