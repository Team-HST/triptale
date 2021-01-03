package com.hst.triptale.content.place.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hst.triptale.content.place.entity.Place;
import com.hst.triptale.content.schedule.entity.DaySchedule;

/**
 * @author dlgusrb0808@gmail.com
 */
@Repository
public interface PlaceRepository extends JpaRepository<Place, Long> {

	List<Place> findPlacesByDaySchedule(DaySchedule daySchedule);

}
