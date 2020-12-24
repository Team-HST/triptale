package com.hst.triptale.content.user.exception;

import com.hst.triptale.exceptionhandling.exception.NotFoundException;

/**
 * @author dlgusrb0808@gmail.com
 */
public class UserNotFoundException extends NotFoundException {

	public UserNotFoundException(Long invalidUserNo) {
		super(UserBusinessExceptionStatus.USER_NOT_FOUND);
		this.addAttribute("userNo", invalidUserNo);
	}

}
