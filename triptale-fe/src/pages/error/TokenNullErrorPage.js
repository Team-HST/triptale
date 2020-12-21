import React from 'react';
import { useHistory } from 'react-router-dom';
import ErrorContainer from 'containers/error/ErrorContainer';

function TokenNullErrorPage() {
  const history = useHistory();

  const handlePageMoveClick = () => {
    history.push('/login');
  };

  return (
    <React.Fragment>
      <ErrorContainer
        errorCode={401}
        title={'서비스 이용에 불편을 드려서 죄송합니다.'}
        subTitle={['유저 정보 기한이 만료 되었습니다.', <br />, '다시 로그인 해주세요.']}
        button={{
          title: '로그인 돌아가기',
          onClick: handlePageMoveClick,
        }}
      />
    </React.Fragment>
  );
}

export default TokenNullErrorPage;
