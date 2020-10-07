package com.hst.triptale.user.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hst.triptale.user.entity.User;

/**
 * @author dlgusrb0808@gmail.com
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	Optional<User> findByEmail(String email);
}
