package com.hst.triptale.security.permission;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.hst.triptale.content.ContentResource;
import com.hst.triptale.content.user.entity.User;
import com.hst.triptale.exceptionhandling.model.PermissionDeniedException;

/**
 * @author dlgusrb0808@gmail.com
 */
@Service
public class ContentResourcePermissionChecker {

	/**
	 * 현재 요청자 엔티티 반환 (JWT 토큰에 담긴 값 기반)
	 * @return 현재 요청자
	 */
	public User getCurrentAuthorizedUser() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		if (authentication == null) {
			throw new AccessDeniedException("인증정보가 존재하지 않습니다.");
		}
		return (User) authentication.getPrincipal();
	}

	/**
	 * 컨텐츠 리소스가 현재 요청자인지 검사
	 * @param contentResource 컨텐츠 리소스
	 */
	public void checkPermission(ContentResource contentResource) {
		if (!getCurrentAuthorizedUser().equals(contentResource.getResourceOwner())) {
			throw new PermissionDeniedException("리소스 접근 권한이 없습니다.");
		}
	}

}
