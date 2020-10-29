package com.hst.triptale.base.ui.response;

import org.springframework.data.domain.Page;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;

/**
 * @author dlgusrb0808@gmail.com
 */
@Getter
public class PagingListResponse {
	@Schema(title = "조회한 페이지 번호", description = "0부터 시작", accessMode = Schema.AccessMode.READ_ONLY)
	private final int page;
	@Schema(title = "페이지 당 row 수", description = "페이지 당 row 수", accessMode = Schema.AccessMode.READ_ONLY)
	private final int size;
	@Schema(title = "총 페이지 수", description = "총 페이지 수", accessMode = Schema.AccessMode.READ_ONLY)
	private final int totalPage;

	public PagingListResponse(Page<?> resultPage) {
		this.page = resultPage.getNumber();
		this.size = resultPage.getSize();
		this.totalPage = resultPage.getTotalPages();
	}
}
