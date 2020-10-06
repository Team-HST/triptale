import React from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';

function OAuth2Route({ Component, ...rest }) {
  const { search } = useLocation();
  // 쿼리스트링 파라미터 포맷
  const queryStrParam = new URLSearchParams(search);
  const successYn = queryStrParam.get('successYn');
  const token = queryStrParam.get('token');

  if (successYn === 'Y') {
    sessionStorage.setItem('token', token);
  } else {
    alert('카카오 로그인에 실패하였습니다.');
  }

  return (
    <React.Fragment>
      {token ? (
        <Route {...rest} render={(props) => <Component {...props} />} />
      ) : (
        <Redirect to="/login" />
      )}
    </React.Fragment>
  );
}

export default OAuth2Route;
