package com.hst.triptale.exceptionhandling.exception;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;

import com.hst.triptale.exceptionhandling.model.BusinessExceptionStatus;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

/**
 * @author dlgusrb0808@gmail.com
 */
@Getter
@RequiredArgsConstructor
public class ApplicationException extends RuntimeException {
	private final HttpStatus httpStatus;
	private final BusinessExceptionStatus exceptionStatus;
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

	@Override
	public String getMessage() {
		return exceptionStatus.getMessage();
	}
}
