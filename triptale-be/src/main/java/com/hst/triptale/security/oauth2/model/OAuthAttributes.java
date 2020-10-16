package com.hst.triptale.security.oauth2.model;

import java.util.Map;

import com.hst.triptale.content.user.entity.User;

import lombok.Builder;
import lombok.Getter;

/**
 * @author dlgusrb0808@gmail.com
 */
@Getter
public class OAuthAttributes {
	private final Map<String, Object> attributes;
	private final String userNameAttributeName;
	private final String name;
	private final String email;
	private final String profileImageUrl;

	@Builder
	public OAuthAttributes(Map<String, Object> attributes, String userNameAttributeName, String name, String email,
		String profileImageUrl) {
		this.attributes = attributes;
		this.userNameAttributeName = userNameAttributeName;
		this.name = name;
		this.email = email;
		this.profileImageUrl = profileImageUrl;
	}

	public User toEntity() {
		return User.builder()
			.email(email)
			.nickname(name)
			.profileImageUrl(profileImageUrl)
			.build();
	}
}
