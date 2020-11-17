package com.hst.triptale.content;

import com.hst.triptale.content.user.entity.User;

/**
 * @author dlgusrb0808@gmail.com
 */
public interface ContentResource {

	/**
	 * 컨텐츠 리소스의 주인 반환
	 * @return 리소스 주인
	 */
	User getResourceOwner();

}
