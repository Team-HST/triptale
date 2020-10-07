package com.hst.triptale.utils;

import java.util.EnumSet;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

import lombok.experimental.UtilityClass;

/**
 * @author dlgusrb0808@gmail.com
 */
@UtilityClass
public class EnumUtils {

	public <K, E extends Enum<E>> Map<K, E> asMap(Class<E> enumClass, Function<E, K> keyFunction) {
		return EnumSet.allOf(enumClass).stream().collect(Collectors.toMap(keyFunction, Function.identity()));
	}

}
