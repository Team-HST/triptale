package com.hst.triptale.content.weather.type;

import java.util.Random;

/**
 * @author dlgusrb0808@gmail.com
 */
public enum WeatherType {
	SUNNY,
	RAINY,
	SNOWY;

	/**
	 * 랜덤 날씨 타입 반환
	 * @return 날씨 타입
	 */
	public static WeatherType random() {
		return values()[new Random().nextInt(3)];
	}
}
