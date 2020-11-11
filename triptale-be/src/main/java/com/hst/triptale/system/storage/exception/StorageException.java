package com.hst.triptale.system.storage.exception;

import org.springframework.http.HttpStatus;

import com.hst.triptale.exceptionhandling.model.ApplicationException;

/**
 * @author dlgusrb0808@gmail.com
 */
public class StorageException extends ApplicationException {
	public StorageException(String message) {
		super(HttpStatus.INTERNAL_SERVER_ERROR, message);
	}
}
