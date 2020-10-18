package com.hst.triptale.security.token;

import com.hst.triptale.security.token.model.UserAuthenticationToken;

/**
 * @author dlgusrb0808@gmail.com
 */
public interface AuthenticationTokenProvider {

	/**
	 * 토큰 발급
	 * @param userNo 토큰 소유자 번호
	 * @return 토큰
	 */
	UserAuthenticationToken issue(Long userNo);

	/**
	 * 토큰에서 사용자 번호 취득
	 * @param token 토큰
	 * @return 사용자 번호
	 */
	Long getUserNoFromToken(String token);

	/**
	 * 토큰 유효성 검사
	 * @param token 토큰
	 * @return 유효성 여부
	 */
	boolean validateToken(String token);

}
