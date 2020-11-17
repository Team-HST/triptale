package com.hst.triptale.security.resourcecheck;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.hst.triptale.content.ContentResource;
import com.hst.triptale.content.user.entity.User;
import com.hst.triptale.exceptionhandling.model.PermissionDeniedException;

/**
 * @author dlgusrb0808@gmail.com
 */
@Service
public class ResourceOwnershipChecker {

	/**
	 * 현재 요청자 엔티티 반환 (JWT 토큰에 담긴 값 기반)
	 * @return 현재 요청자
	 */
	public User getCurrentUser() {
		return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
	}

	/**
	 * 컨텐츠 리소스가 현재 요청자인지 검사
	 * @param contentResource 컨텐츠 리소스
	 */
	public void checkAccessibleResource(ContentResource contentResource) {
		if (!getCurrentUser().equals(contentResource.getResourceOwner())) {
			throw new PermissionDeniedException("리소스 접근 권한이 없습니다.");
		}
	}

}
