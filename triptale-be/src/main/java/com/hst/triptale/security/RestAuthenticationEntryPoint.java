package com.hst.triptale.security;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import com.hst.triptale.exceptionhandling.ExceptionDescription;
import com.hst.triptale.utils.JsonUtils;

/**
 * @author dlgusrb0808@gmail.com
 */
@Component
public class RestAuthenticationEntryPoint implements AuthenticationEntryPoint {

	@Override
	public void commence(HttpServletRequest request, HttpServletResponse response,
		AuthenticationException authException) throws IOException, ServletException {
		authException.printStackTrace();
		HttpStatus responseStatus = HttpStatus.UNAUTHORIZED;
		response.setStatus(responseStatus.value());
		response.setContentType(MediaType.APPLICATION_JSON_VALUE);
		response.setCharacterEncoding(StandardCharsets.UTF_8.name());
		response.getWriter()
			.write(JsonUtils.serialize(
				ExceptionDescription.of(responseStatus.value(), authException.getClass().getName(),
					authException.getLocalizedMessage())));
	}

}
