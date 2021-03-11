package com.hst.triptale.content.weather.service.impl;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.hst.triptale.content.weather.service.WeatherService;
import com.hst.triptale.content.weather.type.WeatherType;

import lombok.extern.slf4j.Slf4j;

/**
 * @author dlgusrb0808@gmail.com
 */
@Slf4j
@Service
public class NaverWeatherService implements WeatherService {

	private static final String WEATHER_SEARCH_URL = "https://weather.naver.com/";

	@Override
	@Cacheable("currentWeatherCache")
	public WeatherType getCurrentWeatherType() {
		try {
			Document document = Jsoup.connect(WEATHER_SEARCH_URL).get();
			Element element = document.selectFirst(".weather_area > .summary > .weather");
			String temperatureString = element.text();
			if (temperatureString.contains("비")) {
				return WeatherType.RAINY;
			}
			if (temperatureString.contains("눈")) {
				return WeatherType.SNOWY;
			}
			return WeatherType.SUNNY;
		} catch (Exception e) {
			log.error("날씨 조회 실패", e);
			return WeatherType.SUNNY;
		}
	}

	@Override
	public int getTemperature() throws Exception {
		Document document = Jsoup.connect(WEATHER_SEARCH_URL).get();
		Element element = document.selectFirst(".weather_area > .current");
		String temperatureString = element.text();
		return Integer.parseInt(temperatureString.substring(5, temperatureString.length() - 1));
	}

}
