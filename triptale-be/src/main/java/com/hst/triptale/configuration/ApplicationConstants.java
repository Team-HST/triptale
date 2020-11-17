package com.hst.triptale.configuration;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

/**
 * @author dlgusrb0808@gmail.com
 */
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class ApplicationConstants {

	/**
	 * API Grouping 관련 상수
	 */
	@NoArgsConstructor(access = AccessLevel.PRIVATE)
	public static class APIGroups {
		public static final String CONTENT_API = "/content";
		public static final String SYSTEM_API = "/system";
	}

	@NoArgsConstructor(access = AccessLevel.PRIVATE)
	public static class Documentations  {
		public static final String REQUIRE_AUTH = "[인증필요] ";
	}
}
