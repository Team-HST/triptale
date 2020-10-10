package com.hst.triptale.security.oauth2;

import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.hst.triptale.security.oauth2.model.OAuthAttributes;
import com.hst.triptale.security.oauth2.type.OAuth2ProviderType;
import com.hst.triptale.user.service.UserService;

import lombok.RequiredArgsConstructor;

/**
 * @author dlgusrb0808@gmail.com
 */
@RequiredArgsConstructor
@Service
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

	private final UserService userService;

	@Override
	public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
		OAuth2UserService<OAuth2UserRequest, OAuth2User> delegate = new DefaultOAuth2UserService();
		OAuth2User oAuth2User = delegate.loadUser(userRequest);
		ClientRegistration clientRegistration = userRequest.getClientRegistration();
		String registrationId = clientRegistration.getRegistrationId();
		String userNameAttributeName = clientRegistration.getProviderDetails()
			.getUserInfoEndpoint()
			.getUserNameAttributeName();
		OAuthAttributes oAuthAttributes = OAuth2ProviderType.getType(registrationId)
			.getOAuthAttributes(userNameAttributeName, oAuth2User.getAttributes());
		return userService.saveOrUpdateByOAuth(oAuthAttributes);
	}

}
