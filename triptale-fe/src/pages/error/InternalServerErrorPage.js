import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import ErrorContainer from 'containers/error/ErrorContainer';

/**
 * @author hoons
 * @email dudgns0612@gmail.com
 * @create date 2020-12-30 00:32:21
 * @modify date 2021-01-07 22:50:51
 * @desc [서비스 내부 오류 에러 페이지 컴포넌트]
 */
function InternalServerErrorPage() {
  const history = useHistory();

  const handlePageMoveClick = useCallback(() => {
    history.push('/');
  }, [history]);

  return (
    <>
      <ErrorContainer
        errorCode={500}
        title={'서비스 이용에 불편을 드려서 죄송합니다.'}
        subTitle={'내부적 이슈로 인하여 잠시후 다시 시도하여 주세요.'}
        button={{
          title: '메인페이지로 돌아가기',
          onClick: handlePageMoveClick,
        }}
      />
    </>
  );
}

export default InternalServerErrorPage;
