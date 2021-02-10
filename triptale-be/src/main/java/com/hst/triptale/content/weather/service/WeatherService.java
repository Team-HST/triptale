package com.hst.triptale.content.weather.service;

import java.util.ArrayList;
import java.util.Random;

import org.springframework.stereotype.Service;

import com.hst.triptale.content.weather.type.WeatherType;

/**
 * @author dlgusrb0808@gmail.com
 */
@Service
public class WeatherService {

	private static final String WEATHER_SEARCH_URL = "https://weather.naver.com/";

	/**
	 * 현재 날씨 타입 조회
	 * @return 날씨 타입
	 */
	public WeatherType getCurrentWeatherType() {
		return WeatherType.values()[new Random().nextInt(3)];
	}

}
