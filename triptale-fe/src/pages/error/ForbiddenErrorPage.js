import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import ErrorContainer from 'containers/error/ErrorContainer';

/**
 * @author hoons
 * @email dudgns0612@gmail.com
 * @create date 2020-12-30 00:32:37
 * @modify date 2021-01-07 22:50:46
 * @desc [권한 관련 에러 페이지 컴포넌트]
 */
function ForbiddenErrorPage() {
  const history = useHistory();

  const handlePageMoveClick = useCallback(() => {
    history.push('/');
  }, [history]);

  return (
    <>
      <ErrorContainer
        errorCode={403}
        title={'서비스 이용에 불편을 드려서 죄송합니다.'}
        subTitle={'요청하신 서비스에 권한이 없습니다.'}
        button={{
          title: '메인페이지로 돌아가기',
          onClick: handlePageMoveClick,
        }}
      />
    </>
  );
}

export default ForbiddenErrorPage;
