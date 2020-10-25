package com.hst.triptale.content.trip.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hst.triptale.content.trip.entity.Trip;

/**
 * @author dlgusrb0808@gmail.com
 */
@Repository
public interface TripRepository extends JpaRepository<Trip, Long> {
}
