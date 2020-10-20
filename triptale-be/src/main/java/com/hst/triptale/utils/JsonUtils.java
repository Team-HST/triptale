package com.hst.triptale.utils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.experimental.UtilityClass;

/**
 * @author dlgusrb0808@gmail.com
 */
@UtilityClass
public class JsonUtils {

	private static final ObjectMapper OBJECT_MAPPER = new ObjectMapper();

	public String serialize(Object obj) throws JsonProcessingException {
		return OBJECT_MAPPER.writeValueAsString(obj);
	}

	public <T> T deserialize(String json, Class<T> clazz) throws JsonProcessingException {
		return OBJECT_MAPPER.readValue(json, clazz);
	}

}
