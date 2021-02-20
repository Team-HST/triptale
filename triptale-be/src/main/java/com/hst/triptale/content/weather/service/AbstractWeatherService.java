package com.hst.triptale.content.weather.service;

import org.springframework.cache.annotation.Cacheable;

import com.hst.triptale.content.weather.type.WeatherType;

import lombok.extern.slf4j.Slf4j;

/**
 * @author dlgusbr0808@gmail.com
 */
@Slf4j
public abstract class AbstractWeatherService implements WeatherService {

	protected double defaultRainyPrecipitation = 70;

	@Override
	@Cacheable("currentWeatherCache")
	public WeatherType getCurrentWeatherType() {
		try {
			if (isRainy()) {
				return getTemperature() > 0 ? WeatherType.RAINY : WeatherType.SNOWY;
			} else {
				return WeatherType.SUNNY;
			}
		} catch (Exception e) {
			log.error("Fail to search weather.", e);
			return WeatherType.random();
		}
	}

	/**
	 * 비가 오는지 판단
	 * @return 비 오는지 여부
	 */
	protected boolean isRainy() throws Exception {
		return getPrecipitation() >= defaultRainyPrecipitation;
	}

}
