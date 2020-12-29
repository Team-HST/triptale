import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import ErrorContainer from 'containers/error/ErrorContainer';

/**
 * @author hoons
 * @email dudgns0612@gmail.com
 * @create date 2020-12-30 00:31:59
 * @modify date 2020-12-30 00:32:17
 * @desc [Not Found 에러 페이지 컴포넌트]
 */
function NotFoundErrorPage() {
  const history = useHistory();

  const handlePageMoveClick = useCallback(() => {
    history.push('/');
  }, [history]);

  return (
    <React.Fragment>
      <ErrorContainer
        errorCode={404}
        title={'서비스 이용에 불편을 드려서 죄송합니다.'}
        subTitle={'요청하신 페이지는 TripTale에서 찾을 수 없습니다.'}
        button={{
          title: '메인페이지로 돌아가기',
          onClick: handlePageMoveClick,
        }}
      />
    </React.Fragment>
  );
}

export default NotFoundErrorPage;
