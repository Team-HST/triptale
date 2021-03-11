package com.hst.triptale.content.weather.service;

import com.hst.triptale.content.weather.type.WeatherType;

/**
 * @author dlgusrb0808@gmail.com
 */
public interface WeatherService {

	/**
	 * 현재 날씨 타입 조회
	 * @return 날씨 타입
	 */
	WeatherType getCurrentWeatherType();

	/**
	 * 현재 기온 조회
	 * @return 기온
	 */
	int getTemperature() throws Exception;

}
