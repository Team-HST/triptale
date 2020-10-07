package com.hst.triptale.utils;

import java.util.Arrays;
import java.util.Base64;
import java.util.Optional;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.util.SerializationUtils;

import lombok.experimental.UtilityClass;

/**
 * @author dlgusrb0808@gmail.com
 */
@UtilityClass
public class CookieUtils {

	public Optional<Cookie> getCookie(HttpServletRequest request, String name) {
		Cookie[] cookies = request.getCookies();
		if (cookies == null || cookies.length == 0) {
			return Optional.empty();
		}
		return Arrays.stream(cookies)
			.filter(cookie -> cookie.getName().equals(name))
			.findFirst();
	}

	public void addCookie(HttpServletResponse response, String name, Object value, int maxAgeSecond) {
		addCookie(response, name, serialize(value), maxAgeSecond);
	}

	public void addCookie(HttpServletResponse response, String name, String value, int maxAgeSecond) {
		Cookie cookie = new Cookie(name, value);
		cookie.setPath("/");
		cookie.setHttpOnly(true);
		cookie.setMaxAge(maxAgeSecond);
		response.addCookie(cookie);
	}

	public void deleteCookie(HttpServletRequest request, HttpServletResponse response, String name) {
		Cookie cookie = getCookie(request, name).orElse(new Cookie(name, null));
		cookie.setValue(null);
		cookie.setPath("/");
		cookie.setMaxAge(0);
		response.addCookie(cookie);
	}

	public static String serialize(Object object) {
		return Base64.getUrlEncoder().encodeToString(SerializationUtils.serialize(object));
	}

	public static <T> T deserialize(String value, Class<T> type) {
		byte[] data = Base64.getUrlDecoder().decode(value);
		return type.cast(SerializationUtils.deserialize(data));
	}

}
