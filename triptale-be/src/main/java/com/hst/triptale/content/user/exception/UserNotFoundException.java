package com.hst.triptale.content.user.exception;

import com.hst.triptale.exceptionhandling.model.NotFoundException;

/**
 * @author dlgusrb0808@gmail.com
 */
public class UserNotFoundException extends NotFoundException {

	public UserNotFoundException(Long invalidUserNo) {
		super("사용자 정보가 존재하지 않습니다.");
		this.addAttribute("userNo", invalidUserNo);
	}

}
