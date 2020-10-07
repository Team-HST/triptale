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
	private String feServiceUrl;
	private final Security security = new Security();

	@Getter
	@Setter
	public static class Security {
		private List<String> publicPaths;
	}
}
