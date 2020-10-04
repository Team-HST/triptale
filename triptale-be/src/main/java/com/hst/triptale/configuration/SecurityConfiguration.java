package com.hst.triptale.configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.client.registration.InMemoryClientRegistrationRepository;

import com.hst.triptale.oauth2.service.CustomOAuth2UserService;
import com.hst.triptale.oauth2.type.OAuth2ProviderType;

import lombok.RequiredArgsConstructor;

/**
 * @author dlgusrb0808@gmail.com
 */
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

	@Value("${app.security.public-apis}")
	private String[] publicApis;

	private final CustomOAuth2UserService oAuth2UserService;

	@Override
	public void configure(HttpSecurity http) throws Exception {
		http
			.cors()
				.and()
			.csrf()
				.disable()
			.formLogin()
				.disable()
			.httpBasic()
				.disable()
			.authorizeRequests()
				.antMatchers(publicApis).permitAll()
				.anyRequest().authenticated()
				.and()
			.oauth2Login()
				.userInfoEndpoint()
					.userService(oAuth2UserService)
				.and()
				.clientRegistrationRepository(clientRegistrationRepository())
		;
	}

	@Bean
	public ClientRegistrationRepository clientRegistrationRepository() {
		return new InMemoryClientRegistrationRepository(OAuth2ProviderType.getAvailableClientRegistrations());
	}

}
