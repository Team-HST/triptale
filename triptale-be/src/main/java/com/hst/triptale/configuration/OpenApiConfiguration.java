package com.hst.triptale.configuration;

import java.util.Collections;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;

/**
 * @author dlgusrb0808@gmail.com
 */
@Configuration
public class OpenApiConfiguration {

	private static final String API_AUTHORIZATION = "Authorization";

	@Bean
	public OpenAPI openAPI() {
		return new OpenAPI()
			.components(new Components()
				.addSecuritySchemes(API_AUTHORIZATION, bearerSecurityScheme())
			)
			.security(Collections.singletonList(new SecurityRequirement().addList(API_AUTHORIZATION)))
			.info(new Info()
				.title("Triptale API")
				.description("Triptale 서비스 API입니다.")
				.version("0.1")
				.termsOfService("https://github.com/Team-HST/triptale")
				.contact(new Contact().name("Team HST").email("team-hst@gamil.com"))
				.license(new License().name("Apache License Version 2.0")
					.url("http://www.apache.org/licenses/LICENSE-2.0"))
			);
	}

	private SecurityScheme bearerSecurityScheme() {
		return new SecurityScheme()
			.name(API_AUTHORIZATION)
			.scheme("bearer")
			.bearerFormat("JWT")
			.type(SecurityScheme.Type.HTTP)
			.in(SecurityScheme.In.HEADER);
	}

}
