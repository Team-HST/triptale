import React from 'react';
import { useHistory } from 'react-router-dom';
import ErrorContainer from 'containers/error/ErrorContainer';

function NotFoundErrorPage() {
  const history = useHistory();

  const handlePageMoveClick = () => {
    history.goBack();
  };

  return (
    <React.Fragment>
      <ErrorContainer
        errorCode={404}
        title={'서비스 이용에 불편을 드려서 죄송합니다.'}
        subTitle={'요청하신 페이지는 TripTale에서 찾을 수 없습니다.'}
        button={{
          title: '이전페이지로 돌아가기',
          onClick: handlePageMoveClick,
        }}
      />
    </React.Fragment>
  );
}

export default NotFoundErrorPage;
