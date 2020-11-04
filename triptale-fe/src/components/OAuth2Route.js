import React from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { userService } from 'lib/axios/services';

// Kakao OAuth check route
function OAuth2Route() {
  const { search } = useLocation();
  // 쿼리스트링 파라미터 포맷
  const queryStrParam = new URLSearchParams(search);
  const successYn = queryStrParam.get('successYn');
  const token = queryStrParam.get('token');
  const userNo = queryStrParam.get('userNo');
  let goPath = '';

  // todo - 추후 redux 작업
  // const getUser = async (userNo) => {
  //   const response = await userService.searchUser(userNo);
  //   sessionStorage.setItem('user', JSON.stringify(response));
  // };

  if (successYn === 'Y') {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('userNo', userNo);

    goPath = '/main';
  } else {
    alert('카카오 로그인에 실패하였습니다.');
    goPath = '/login';
  }

  return <Redirect to={goPath} />;
}

export default OAuth2Route;
