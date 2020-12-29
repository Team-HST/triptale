import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import ErrorContainer from 'containers/error/ErrorContainer';

function ForbiddenErrorPage() {
  const history = useHistory();

  const handlePageMoveClick = useCallback(() => {
    history.push('/');
  }, [history]);

  return (
    <React.Fragment>
      <ErrorContainer
        errorCode={403}
        title={'서비스 이용에 불편을 드려서 죄송합니다.'}
        subTitle={'요청하신 서비스에 권한이 없습니다.'}
        button={{
          title: '메인페이지로 돌아가기',
          onClick: handlePageMoveClick,
        }}
      />
    </React.Fragment>
  );
}

export default ForbiddenErrorPage;
