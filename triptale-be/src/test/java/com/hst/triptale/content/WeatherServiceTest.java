package com.hst.triptale.content;

import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.hst.triptale.content.weather.service.WeatherService;
import com.hst.triptale.content.weather.service.impl.NaverWeatherService;

/**
 * @author dlgusrb0808@gmail.com
 */
class WeatherServiceTest {
	private static final Logger log = LoggerFactory.getLogger(WeatherServiceTest.class);

	private WeatherService weatherService = new NaverWeatherService();

	@Test
	void getWeatherTest() {
		System.out.println(weatherService.getCurrentWeatherType());
	}

}
