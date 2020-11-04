package com.hst.triptale.content.user.exception;

import com.hst.triptale.exceptionhandling.model.NotFoundException;

/**
 * @author dlgusrb0808@gmail.com
 */
public class UserNotFoundException extends NotFoundException {

	public UserNotFoundException(String message, Long invalidUserNo) {
		super(message);
		this.addAttribute("userNo", invalidUserNo);
	}

}
