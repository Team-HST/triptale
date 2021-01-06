package com.hst.triptale.content.trip.entity;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * @author dlgusrb0808@gmail.com
 */
@Getter
@NoArgsConstructor
@AllArgsConstructor(staticName = "of")
@Embeddable
public class Location {

	@Column(name = "LATITUDE")
	private Double latitude;

	@Column(name = "LONGITUDE")
	private Double longitude;

}
