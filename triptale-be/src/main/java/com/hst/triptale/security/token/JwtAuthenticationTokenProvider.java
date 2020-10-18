package com.hst.triptale.security.token;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;

import com.hst.triptale.configuration.props.ApplicationProps;
import com.hst.triptale.security.token.model.UserAuthenticationToken;
import com.hst.triptale.utils.TimeUtils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * @author dlgusrb0808@gmail.com
 */
@Slf4j
@RequiredArgsConstructor
@Component
public class JwtAuthenticationTokenProvider implements AuthenticationTokenProvider {

	private final ApplicationProps applicationProps;

	@Override
	public UserAuthenticationToken issue(Long userNo) {
		return UserAuthenticationToken.builder()
			.userNo(userNo)
			.token(buildToken(userNo))
			.build();
	}

	private String buildToken(Long userNo) {
		LocalDateTime now = LocalDateTime.now();
		LocalDateTime expiredAt = now.plus(applicationProps.getSecurity().getTokenExpirationMs(), ChronoUnit.MILLIS);
		return Jwts.builder()
			.setSubject(String.valueOf(userNo))
			.setIssuedAt(TimeUtils.toDate(now))
			.setExpiration(TimeUtils.toDate(expiredAt))
			.signWith(SignatureAlgorithm.HS512, applicationProps.getSecurity().getTokenSecret())
			.compact();
	}

	@Override
	public Long getUserNoFromToken(String token) {
		Claims claims = Jwts.parser()
			.setSigningKey(applicationProps.getSecurity().getTokenSecret())
			.parseClaimsJws(token)
			.getBody();
		return Long.parseLong(claims.getSubject());
	}

	@Override
	public boolean validateToken(String token) {
		if (StringUtils.isNotBlank(token)) {
			try {
				Jwts.parser().setSigningKey(applicationProps.getSecurity().getTokenSecret()).parseClaimsJws(token);
				return true;
			} catch (Exception e) {
				log.error("유효하지 않은 인증토큰입니다.", e);
			}
		}
		return false;
	}

}
