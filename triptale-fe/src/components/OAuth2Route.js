import React from 'react';
import { Redirect, useLocation } from 'react-router-dom';

// Kakao OAuth check route
function OAuth2Route() {
  const { search } = useLocation();
  // 쿼리스트링 파라미터 포맷
  const queryStrParam = new URLSearchParams(search);
  const successYn = queryStrParam.get('successYn');
  const token = queryStrParam.get('token');
  let goPath = '';

  if (successYn === 'Y') {
    sessionStorage.setItem('token', token);
    goPath = '/main';
  } else {
    alert('카카오 로그인에 실패하였습니다.');
    goPath = '/login';
  }

  return <Redirect to={goPath} />;
}

export default OAuth2Route;
