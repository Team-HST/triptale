package com.hst.triptale.base.ui.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;

/**
 * @author dlgusrb0808@gmail.com
 */
@Getter
public abstract class BaseModifyingRequest {

	@Schema(title = "사용자 번호", description = "등록 / 수정이 가능한 컨텐츠의 등록자", required = true)
	private Long userNo;

}
