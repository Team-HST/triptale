package com.hst.triptale.content.weather.ui;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hst.triptale.configuration.ApplicationConstants;
import com.hst.triptale.content.weather.service.WeatherService;
import com.hst.triptale.content.weather.type.WeatherType;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

/**
 * @author dlgusrb0808@gmail.com
 */
@Tag(name = "날씨 API", description = "날씨 관련 API")
@RequiredArgsConstructor
@RestController
@RequestMapping(ApplicationConstants.APIGroups.CONTENT_API + "/weather")
public class WeatherController {

	private final WeatherService weatherService;

	@Operation(summary = "현재 날씨 타입 조회")
	@GetMapping("current")
	public WeatherType getCurrentWeatherType() {
		return weatherService.getCurrentWeatherType();
	}

}
