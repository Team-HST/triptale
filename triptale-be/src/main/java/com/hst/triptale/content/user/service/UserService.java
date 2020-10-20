package com.hst.triptale.content.user.service;

import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.hst.triptale.content.user.entity.User;
import com.hst.triptale.content.user.repository.UserRepository;
import com.hst.triptale.exceptionhandling.model.NotFoundException;
import com.hst.triptale.security.oauth2.model.OAuthAttributes;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * @author dlgusrb0808@gmail.com
 */
@Slf4j
@RequiredArgsConstructor
@Service
public class UserService implements UserDetailsService {

	private final UserRepository userRepository;



	/**
	 * OAuth를 통한 사용자 등록
	 * @param attributes OAuth 정보
	 * @return 사용자 정보
	 */
	public User saveOrUpdateByOAuth(OAuthAttributes attributes) {
		User user = userRepository.findByEmail(attributes.getEmail())
			.map(entity -> entity.updateProfile(attributes.getName(), attributes.getProfileImageUrl()))
			.orElse(attributes.toEntity());
		return userRepository.save(user);
	}

	@Override
	public User loadUserByUsername(String username) throws UsernameNotFoundException {
		return userRepository.findById(Long.parseLong(username))
			.orElseThrow(() -> new NotFoundException("사용자를 찾을 수 없습니다.").addAttribute("userNo", username));
	}
}
