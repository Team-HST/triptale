package com.hst.triptale.exceptionhandling.model;

import java.util.HashMap;
import java.util.Map;

import com.hst.triptale.exceptionhandling.exception.ApplicationException;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

/**
 * @author dlgusrb0808@gmail.com
 */
@Getter
@RequiredArgsConstructor(staticName = "of")
public class ExceptionDescription {
	private final int statusCode;
	private final String exception;
	private final String message;
	private Map<String, Object> attributes;

	public ExceptionDescription addAttributes(Map<String, Object> attributes) {
		if (this.attributes == null) {
			this.attributes = attributes;
		} else {
			this.attributes.putAll(attributes);
		}
		return this;
	}

	public ExceptionDescription addAttribute(String name, Object value) {
		if (attributes == null) {
			this.attributes = new HashMap<>();
		}
		this.attributes.put(name, value);
		return this;
	}

	public static ExceptionDescription fromApplicationException(ApplicationException e) {
		BusinessExceptionStatus exceptionStatus = e.getExceptionStatus();
		return of(exceptionStatus.getStatusCode(), e.getClass().getName(), exceptionStatus.getMessage())
			.addAttributes(e.getAttributes());
	}
}
