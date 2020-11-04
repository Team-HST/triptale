package com.hst.triptale.content.trip.ui.response;

import java.util.List;

import org.springframework.data.domain.Page;

import com.hst.triptale.base.ui.response.PagingListResponse;
import com.hst.triptale.content.trip.entity.Trip;

import lombok.Getter;

/**
 * @author dlgusrb0808@gmail.com
 */
@Getter
public class TripListResponse extends PagingListResponse {
	private final List<TripResponse> trips;

	public TripListResponse(Page<Trip> resultPage) {
		super(resultPage);
		this.trips = resultPage.map(TripResponse::from).getContent();
	}
}
