package com.hst.triptale.system.storage.exception;

import org.springframework.http.HttpStatus;

import com.hst.triptale.exceptionhandling.exception.ApplicationException;
import com.hst.triptale.system.SystemExceptionStatus;

/**
 * @author dlgusrb0808@gmail.com
 */
public class StorageException extends ApplicationException {
	public StorageException() {
		super(HttpStatus.INTERNAL_SERVER_ERROR, SystemExceptionStatus.UNKNOWN_SYSTEM_ERROR);
	}
}
