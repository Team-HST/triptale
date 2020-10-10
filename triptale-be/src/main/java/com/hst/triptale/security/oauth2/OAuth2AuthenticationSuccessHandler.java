package com.hst.triptale.security.oauth2;

import static com.hst.triptale.security.oauth2.HttpCookieOAuth2AuthorizationRequestRepository.*;

import java.io.IOException;
import java.util.Optional;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import com.hst.triptale.configuration.props.ApplicationProps;
import com.hst.triptale.security.token.AuthenticationTokenProvider;
import com.hst.triptale.security.token.model.UserAuthenticationToken;
import com.hst.triptale.user.entity.User;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * @author dlgusrb0808@gmail.com
 */
@Slf4j
@RequiredArgsConstructor
@Component
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

	private final ApplicationProps applicationProps;
	private final HttpCookieOAuth2AuthorizationRequestRepository authorizationRequestRepository;
	private final AuthenticationTokenProvider authenticationTokenProvider;

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
		Authentication authentication) throws IOException, ServletException {
		String redirectUrl = this.determineTargetUrl(request, response, authentication);
		if (response.isCommitted()) {
			log.debug("Unable to redirect to {}. response already committed.", redirectUrl);
			return;
		}
		clearAuthenticationAttributes(request, response);
		getRedirectStrategy().sendRedirect(request, response, redirectUrl);
	}

	@Override
	protected String determineTargetUrl(HttpServletRequest request, HttpServletResponse response,
		Authentication authentication) {
		UserAuthenticationToken token = authenticationTokenProvider.issue(
			((User)authentication.getPrincipal()).getNo());
		return UriComponentsBuilder.fromUriString(applicationProps.getFeServiceUrl())
			.path("login-callback")
			.queryParam("successYn", "Y")
			.queryParam("token", token.getToken())
			.build().toUriString();
	}

	protected void clearAuthenticationAttributes(HttpServletRequest request, HttpServletResponse response) {
		super.clearAuthenticationAttributes(request);
		authorizationRequestRepository.removeAuthorizationRequest(request, response);
	}

}
