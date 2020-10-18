package com.hst.triptale.security.token.model;

import lombok.Builder;
import lombok.Getter;

/**
 * @author dlgusrb0808@gmail.com
 */
@Getter
@Builder
public class UserAuthenticationToken {
	private final Long userNo;
	private final String token;
}
