package com.hst.triptale;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import com.hst.triptale.configuration.props.ApplicationProps;

@SpringBootApplication
@EnableConfigurationProperties(value = {ApplicationProps.class})
@EnableJpaAuditing
@EnableCaching
public class TriptaleApplication {

	public static void main(String[] args) {
		SpringApplication.run(TriptaleApplication.class, args);
	}

}
