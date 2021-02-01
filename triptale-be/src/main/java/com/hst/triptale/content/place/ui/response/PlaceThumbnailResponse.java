package com.hst.triptale.content.place.ui.response;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

/**
 * @author hyungyu.lee@nhn.com
 */
@Getter
@RequiredArgsConstructor(staticName = "from")
public class PlaceThumbnailResponse {

	private final String thumbnailUrl;

}
