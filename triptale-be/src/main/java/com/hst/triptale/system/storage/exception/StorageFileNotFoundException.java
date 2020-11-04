package com.hst.triptale.system.storage.exception;

import com.hst.triptale.exceptionhandling.model.NotFoundException;

/**
 * @author dlgusrb0808@gmail.com
 */
public class StorageFileNotFoundException extends NotFoundException {

	public StorageFileNotFoundException(String message, Long invalidFileNo) {
		super(message);
		this.addAttribute("fileNo", invalidFileNo);
	}

}
