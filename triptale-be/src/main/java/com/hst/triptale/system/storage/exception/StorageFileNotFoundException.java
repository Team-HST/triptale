package com.hst.triptale.system.storage.exception;

import com.hst.triptale.exceptionhandling.exception.NotFoundException;
import com.hst.triptale.system.SystemExceptionStatus;

/**
 * @author dlgusrb0808@gmail.com
 */
public class StorageFileNotFoundException extends NotFoundException {

	public StorageFileNotFoundException(Long invalidFileNo) {
		super(SystemExceptionStatus.UNKNOWN_SYSTEM_ERROR);
		this.addAttribute("fileNo", invalidFileNo);
	}

}
