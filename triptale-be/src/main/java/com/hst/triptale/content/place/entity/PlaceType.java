package com.hst.triptale.content.place.entity;

import java.util.Map;

import javax.persistence.AttributeConverter;

import com.hst.triptale.utils.EnumUtils;

/**
 * @author dlgusrb0808@gmail.com
 */
public enum PlaceType {
	NORMAL(1, "일반 여행지"),
	HOSTEL(2, "숙소")
	;

	private static Map<Integer, PlaceType> FIND = EnumUtils.asMap(PlaceType.class, PlaceType::getType);

	private final int type;
	private final String description;

	PlaceType(int type, String description) {
		this.type = type;
		this.description = description;
	}

	public int getType() {
		return type;
	}

	public String getDescription() {
		return description;
	}

	public static PlaceType getType(Integer placeType) {
		return FIND.get(placeType);
	}

	public static class Converter implements AttributeConverter<PlaceType, Integer> {
		@Override
		public Integer convertToDatabaseColumn(PlaceType attribute) {
			return attribute.getType();
		}
		@Override
		public PlaceType convertToEntityAttribute(Integer dbData) {
			return PlaceType.getType(dbData);
		}
	}
}
