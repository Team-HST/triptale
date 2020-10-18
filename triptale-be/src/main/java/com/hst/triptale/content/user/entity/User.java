package com.hst.triptale.content.user.entity;

import java.util.Collections;
import java.util.Map;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

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
public class User implements UserDetails, OAuth2User {

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

	@Transient
	private final Set<GrantedAuthority> authorities = Collections.singleton(new SimpleGrantedAuthority("ROLE_USER"));

	@Transient
	private Map<String, Object> attributes;

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

	@Override
	public String getPassword() {
		return null;
	}

	@Override
	public String getUsername() {
		return String.valueOf(no);
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

	@Override
	public Map<String, Object> getAttributes() {
		return attributes;
	}

	public Set<GrantedAuthority> getAuthorities() {
		return authorities;
	}

	@Override
	public String getName() {
		return this.getUsername();
	}
}
