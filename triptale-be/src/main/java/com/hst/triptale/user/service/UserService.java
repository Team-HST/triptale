package com.hst.triptale.user.service;

import org.springframework.stereotype.Service;

import com.hst.triptale.security.oauth2.model.OAuthAttributes;
import com.hst.triptale.user.entity.User;
import com.hst.triptale.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * @author dlgusrb0808@gmail.com
 */
@Slf4j
@RequiredArgsConstructor
@Service
public class UserService {
	private final UserRepository userRepository;

	/**
	 * OAuth를 통한 사용자 등록
	 * @param attributes OAuth 정보
	 * @return
	 */
	public User saveOrUpdateByOAuth(OAuthAttributes attributes) {
		User user = userRepository.findByEmail(attributes.getEmail())
			.map(entity -> entity.updateProfile(attributes.getName(), attributes.getProfileImageUrl()))
			.orElse(attributes.toEntity());
		return userRepository.save(user);
	}
}
