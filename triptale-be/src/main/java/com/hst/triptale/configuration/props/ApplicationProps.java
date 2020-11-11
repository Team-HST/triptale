package com.hst.triptale.configuration.props;

import java.util.List;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import lombok.Getter;
import lombok.Setter;

/**
 * @author dlgusrb0808@gmail.com
 */
@Getter
@Setter
@Component
@ConfigurationProperties(prefix = "app")
public class ApplicationProps {
	private final File file = new File();
	private final Security security = new Security();
	private String feServiceUrl;

	@Getter
	@Setter
	public static class Security {
		private List<String> publicPaths;
		private String tokenSecret;
		private Long tokenExpirationMs;
	}

	@Getter
	@Setter
	public static class File {
		private String uploadDir;
	}
}
