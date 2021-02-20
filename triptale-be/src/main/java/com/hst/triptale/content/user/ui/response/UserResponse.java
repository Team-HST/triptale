package com.hst.triptale.content.user.ui.response;

import com.hst.triptale.content.user.entity.User;

import lombok.Builder;
import lombok.Getter;

/**
 * @author dlgusrb0808@gmail.com
 */
@Getter
@Builder
public class UserResponse {
	private final Long no;
	private final String email;
	private final String nickname;
	private final String profileImageUrl;

	public static UserResponse from(User user) {
		return builder()
			.no(user.getNo())
			.email(user.getEmail())
			.nickname(user.getNickname())
			.profileImageUrl(user.getProfileImageUrl())
			.build();
	}
}
