package com.hst.triptale.user.entity;

import javax.persistence.*;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * @author dlgusrb0808@gmail.com
 */
@Getter
@NoArgsConstructor
@Entity
@Table(name = "USER")
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "USER_NO")
	private Long no;

	@Column(name = "USER_EMAIL")
	private String email;

	@Column(name = "USER_NICKNM")
	private String nickname;

	@Column(name = "USER_PROFILE_IMG_URL")
	private String profileImageUrl;

	@Builder
	public User(Long no, String email, String nickname, String profileImageUrl) {
		this.no = no;
		this.email = email;
		this.nickname = nickname;
		this.profileImageUrl = profileImageUrl;
	}

	public User updateProfile(String nickname, String profileImageUrl) {
		this.nickname = nickname;
		this.profileImageUrl = profileImageUrl;
		return this;
	}
}
