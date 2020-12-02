package com.hst.triptale.content.trip.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hst.triptale.content.schedule.entity.DaySchedule;

/**
 * @author dlgusrb0808@gmail.com
 */
public interface DayScheduleRepository extends JpaRepository<DaySchedule, Long> {

	boolean existsByTripNoAndOrder(Long tripNo, Integer order);

}
