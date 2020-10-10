package com.hst.triptale.user.ui;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hst.triptale.user.entity.User;
import com.hst.triptale.user.service.UserService;

import lombok.RequiredArgsConstructor;

/**
 * @author dlgusrb0808@gmail.com
 */
@RequiredArgsConstructor
@RestController
@RequestMapping("/users")
public class UserController {

	private final UserService userService;

	@GetMapping("{no}")
	public User getUser(@PathVariable Long no) {
		return userService.loadUserByUsername(no.toString());
	}


}
