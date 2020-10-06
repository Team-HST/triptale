package com.hst.triptale.security.oauth2;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import com.hst.triptale.configuration.props.ApplicationProps;

import lombok.RequiredArgsConstructor;

/**
 * @author dlgusrb0808@gmail.com
 */
@RequiredArgsConstructor
@Component
public class OAuth2AuthenticationFailureHandler extends SimpleUrlAuthenticationFailureHandler {

	private final ApplicationProps applicationProps;
	private final HttpCookieOAuth2AuthorizationRequestRepository authorizationRequestRepository;


	@Override
	public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
		AuthenticationException exception) throws IOException, ServletException {
		authorizationRequestRepository.removeAuthorizationRequest(request, response);
		getRedirectStrategy().sendRedirect(request, response, determineTargetUrl(request, response, exception));
	}

	private String determineTargetUrl(HttpServletRequest request, HttpServletResponse response,
		AuthenticationException exception) {
		return UriComponentsBuilder.fromUriString(applicationProps.getFeServiceUrl())
			.queryParam("loginSuccess", "N")
			.queryParam("error", exception.getLocalizedMessage())
			.build().toUriString();
	}

}
