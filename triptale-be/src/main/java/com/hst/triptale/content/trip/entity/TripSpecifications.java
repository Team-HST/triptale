package com.hst.triptale.content.trip.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.Predicate;

import org.apache.commons.lang3.StringUtils;
import org.springframework.data.jpa.domain.Specification;

import com.hst.triptale.content.trip.ui.request.TripSearchRequest;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

/**
 * @author dlgusrb0808@gmail.com
 */
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class TripSpecifications {

	/**
	 * 제목 Like 검색 조건
	 * @param request 검색 요청
	 * @return 검색 조건 모델
	 */
	public static Specification<Trip> buildSpecification(TripSearchRequest request) {
		return (root, query, builder) -> {
			List<Predicate> predicates = new ArrayList<>();
			if (request.getUserNo() != null && request.getUserNo() != 0) {
				predicates.add(builder.equal(root.get("registrar").get("no"), request.getUserNo()));
			}
			if (StringUtils.isNotBlank(request.getSearchTitle())) {
				predicates.add(builder.like(root.get("title"), like(request.getSearchTitle())));
			}
			return builder.and(predicates.toArray(new Predicate[0]));
		};
	}

	private static String like(String content) {
		return String.format("%%%s%%", content);
	}
}
