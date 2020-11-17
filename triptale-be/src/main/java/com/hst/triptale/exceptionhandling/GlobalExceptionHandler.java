package com.hst.triptale.exceptionhandling;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.hst.triptale.exceptionhandling.model.ApplicationException;

import lombok.extern.slf4j.Slf4j;

/**
 * @author dlgusrb0808@gmail.com
 */
@Slf4j
@RestControllerAdvice(annotations = RestController.class)
public class GlobalExceptionHandler {

	@ExceptionHandler(Exception.class)
	@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
	public ResponseEntity<ExceptionDescription> handleException(Exception e) {
		log.error("Unknown Unknown Exception below.", e);
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
			.body(ExceptionDescription
				.of(HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getClass().getName(),
					e.getLocalizedMessage()));
	}

	@ExceptionHandler(ApplicationException.class)
	public ResponseEntity<ExceptionDescription> handleApplicationException(ApplicationException e) {
		log.warn("Handle Application Exception below.", e);
		return ResponseEntity.status(e.getStatus())
			.body(ExceptionDescription.fromApplicationException(e));
	}

}
