package com.hst.triptale.content.weather.service.impl;

import java.io.IOException;
import java.util.Random;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.springframework.stereotype.Service;

import com.hst.triptale.content.weather.service.AbstractWeatherService;
import com.hst.triptale.content.weather.type.WeatherType;

import lombok.extern.slf4j.Slf4j;

/**
 * @author dlgusrb0808@gmail.com
 */
@Slf4j
@Service
public class NaverWeatherService extends AbstractWeatherService {

	private static final String WEATHER_SEARCH_URL = "https://weather.naver.com/";

	@Override
	public double getPrecipitation() throws Exception {
		Document document = Jsoup.connect(WEATHER_SEARCH_URL).get();
		Element element = document.selectFirst(".weather_area > .summary_list > dd");
		String precipitationString = element.text();
		return Double.parseDouble(precipitationString.substring(0, precipitationString.length() - 1));
	}

	@Override
	public int getTemperature() throws Exception {
		Document document = Jsoup.connect(WEATHER_SEARCH_URL).get();
		Element element = document.selectFirst(".weather_area > .current");
		String temperatureString = element.text();
		return Integer.parseInt(temperatureString.substring(5, temperatureString.length() - 1));
	}




}
