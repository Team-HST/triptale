package com.hst.triptale.content.user.ui;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hst.triptale.configuration.ApplicationConstants;
import com.hst.triptale.content.user.entity.User;
import com.hst.triptale.content.user.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

/**
 * @author dlgusrb0808@gmail.com
 */
@Tag(name = "사용자 API", description = "사용자 관련 API")
@RequiredArgsConstructor
@RestController
@RequestMapping(ApplicationConstants.APIGroups.CONTENT_API + "/users")
public class UserController {

	private final UserService userService;

	@Operation(
		summary = ApplicationConstants.Documentations.REQUIRE_AUTH + "사용자 정보 조회",
		parameters = {
			@Parameter(name = "no", description = "사용자 번호", in = ParameterIn.PATH)
		}
	)
	@GetMapping("{no}")
	public User getUser(@PathVariable Long no) {
		return userService.loadUserByUsername(no.toString());
	}

}
