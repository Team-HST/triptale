package com.hst.triptale.content.trip.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.Predicate;

import org.apache.commons.lang3.StringUtils;
import org.springframework.data.jpa.domain.Specification;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

/**
 * @author dlgusrb0808@gmail.com
 */
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class TripSpecifications {

	/**
	 * 제목 Like 검색 조건
	 * @param title 검색 제목
	 * @return 검색 조건 모델
	 */
	public static Specification<Trip> containsTitle(String title) {
		return (root, query, builder) -> {
			List<Predicate> predicates = new ArrayList<>();
			if (StringUtils.isNotBlank(title)) {
				predicates.add(builder.like(root.get("title"), like(title)));
			}
			return builder.and(predicates.toArray(new Predicate[0]));
		};
	}

	private static String like(String content) {
		return String.format("%%%s%%", content);
	}
}
