package com.hst.triptale.security.oauth2.type;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.core.AuthorizationGrantType;
import org.springframework.security.oauth2.core.ClientAuthenticationMethod;

import com.hst.triptale.security.oauth2.model.OAuthAttributes;
import com.hst.triptale.utils.EnumUtils;

/**
 * @author dlgusrb0808@gmail.com
 */
@SuppressWarnings("unchecked")
public enum OAuth2ProviderType {
	KAKAO("kakao", ClientAuthenticationMethod.POST) {
		@Override
		public ClientRegistration getClientRegistration() {
			return getBaseBuilder()
				.scope("profile", "account_email")
				.authorizationUri("https://kauth.kakao.com/oauth/authorize")
				.tokenUri("https://kauth.kakao.com/oauth/token")
				.userInfoUri("https://kapi.kakao.com/v2/user/me") // 유저 정보 조회 API
				.clientId("893866cbdc17fb1c0a4ec68d6b8f381d")
				.clientSecret("mYMeTAY0yfOmmKbIwDxCVOMJLGGehwR8")
				.userNameAttributeName("id") // userInfo API Response에서 얻어올 ID 프로퍼티
				.clientName("kakao")
				.build();
		}

		@Override
		public OAuthAttributes getOAuthAttributes(String userNameAttributeName, Map<String, Object> attributes) {
			Map<String, Object> kakaoAccount = (Map<String, Object>) attributes.get("kakao_account");
			Map<String, Object> profile = (Map<String, Object>) kakaoAccount.get("profile");
			return OAuthAttributes.builder()
				.attributes(attributes)
				.userNameAttributeName(userNameAttributeName)
				.name((String)profile.get("nickname"))
				.email((String)kakaoAccount.get("email"))
				.profileImageUrl((String)profile.get("profile_image_url"))
				.build();
		}
	};

	private static final Map<String, OAuth2ProviderType> FINDER = EnumUtils.asMap(OAuth2ProviderType.class,
		OAuth2ProviderType::getRegistrationId);
	private static final String DEFAULT_LOGIN_REDIRECT_URL = "{baseUrl}/api/oauth2/processing/{registrationId}";

	private String registrationId;
	private ClientAuthenticationMethod method;

	OAuth2ProviderType(String registrationId, ClientAuthenticationMethod method) {
		this.registrationId = registrationId;
		this.method = method;
	}

	public String getRegistrationId() {
		return registrationId;
	}

	protected final ClientRegistration.Builder getBaseBuilder() {
		return ClientRegistration.withRegistrationId(registrationId)
			.clientAuthenticationMethod(method)
			.authorizationGrantType(AuthorizationGrantType.AUTHORIZATION_CODE)
			.redirectUriTemplate(DEFAULT_LOGIN_REDIRECT_URL)
		;
	}

	public abstract OAuthAttributes getOAuthAttributes(String userNameAttributeName, Map<String, Object> attributes);

	public abstract ClientRegistration getClientRegistration();

	public static List<ClientRegistration> getAvailableClientRegistrations() {
		return Arrays.stream(values())
			.map(OAuth2ProviderType::getClientRegistration)
			.collect(Collectors.toList());
	}

	public static OAuth2ProviderType getType(String registrationId) {
		return FINDER.get(registrationId);
	}

}
