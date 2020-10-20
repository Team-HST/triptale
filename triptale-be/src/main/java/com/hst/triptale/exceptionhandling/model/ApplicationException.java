package com.hst.triptale.exceptionhandling.model;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

/**
 * @author hyungyu.lee@nhn.com
 */
@Getter
@RequiredArgsConstructor
public class ApplicationException extends RuntimeException {
	private final HttpStatus status;
	private final String message;
	private Map<String, Object> attributes;

	public final ApplicationException addAttributes(Map<String, Object> attributes) {
		if (this.attributes == null) {
			this.attributes = attributes;
		} else {
			this.attributes.putAll(attributes);
		}
		return this;
	}

	public final ApplicationException addAttribute(String name, Object value) {
		if (attributes == null) {
			this.attributes = new HashMap<>();
		}
		this.attributes.put(name, value);
		return this;
	}
}
