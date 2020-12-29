import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import ErrorContainer from 'containers/error/ErrorContainer';

function InternalServerErrorPage() {
  const history = useHistory();

  const handlePageMoveClick = useCallback(() => {
    history.push('/');
  }, [history]);

  return (
    <React.Fragment>
      <ErrorContainer
        errorCode={500}
        title={'서비스 이용에 불편을 드려서 죄송합니다.'}
        subTitle={'내부적 이슈로 인하여 잠시후 다시 시도하여 주세요.'}
        button={{
          title: '메인페이지로 돌아가기',
          onClick: handlePageMoveClick,
        }}
      />
    </React.Fragment>
  );
}

export default InternalServerErrorPage;
