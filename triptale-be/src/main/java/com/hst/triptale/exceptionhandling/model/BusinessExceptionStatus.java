package com.hst.triptale.exceptionhandling.model;

/**
 * @author dlgusrb0808@gmail.com
 */
public interface BusinessExceptionStatus {

	/**
	 * 비즈니스 예외의 코드 반환 (HTTP StatusCode 아님)
	 * @return 어플리케이션 예외의 코드
	 */
	int getStatusCode();

	/**
	 * 비즈니스 예외의 메시지 반환
	 * @return 어플리케이션 예외의 메시지
	 */
	String getMessage();

}
