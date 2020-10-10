package com.hst.triptale.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.client.registration.InMemoryClientRegistrationRepository;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.hst.triptale.configuration.props.ApplicationProps;
import com.hst.triptale.security.oauth2.CustomOAuth2UserService;
import com.hst.triptale.security.oauth2.HttpCookieOAuth2AuthorizationRequestRepository;
import com.hst.triptale.security.oauth2.OAuth2AuthenticationFailureHandler;
import com.hst.triptale.security.oauth2.OAuth2AuthenticationSuccessHandler;
import com.hst.triptale.security.oauth2.type.OAuth2ProviderType;
import com.hst.triptale.security.token.TokenAuthenticationFilter;

import lombok.RequiredArgsConstructor;

/**
 * @author dlgusrb0808@gmail.com
 */
@RequiredArgsConstructor
@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

	private final ApplicationProps applicationProps;

	private final HttpCookieOAuth2AuthorizationRequestRepository authorizationRequestRepository;
	private final CustomOAuth2UserService oAuth2UserService;
	private final OAuth2AuthenticationSuccessHandler authenticationSuccessHandler;
	private final OAuth2AuthenticationFailureHandler authenticationFailureHandler;

	private final TokenAuthenticationFilter tokenAuthenticationFilter;

	@Override
	public void configure(HttpSecurity http) throws Exception {
		http
			.cors()
				.and()
			.sessionManagement()
				.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
				.and()
			.csrf()
				.disable()
			.formLogin()
				.disable()
			.httpBasic()
				.disable()
			.authorizeRequests()
				.antMatchers(applicationProps.getSecurity().getPublicPaths().toArray(new String[0])).permitAll()
				.anyRequest().authenticated()
				.and()
			.oauth2Login()
				.authorizationEndpoint()
					.baseUri("/api/oauth2/authorize")
					.authorizationRequestRepository(authorizationRequestRepository)
					.and()
				.redirectionEndpoint()
					.baseUri("/api/oauth2/processing/*")
					.and()
				.userInfoEndpoint()
					.userService(oAuth2UserService)
					.and()
				.successHandler(authenticationSuccessHandler)
				.failureHandler(authenticationFailureHandler)
		;

		http.addFilterBefore(tokenAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
	}

	@Bean
	public ClientRegistrationRepository clientRegistrationRepository() {
		return new InMemoryClientRegistrationRepository(OAuth2ProviderType.getAvailableClientRegistrations());
	}

}
