package com.hst.triptale;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

import com.hst.triptale.configuration.props.ApplicationProps;

@SpringBootApplication
@EnableConfigurationProperties(value = {ApplicationProps.class})
public class TriptaleApplication {

	public static void main(String[] args) {
		SpringApplication.run(TriptaleApplication.class, args);
	}

}
