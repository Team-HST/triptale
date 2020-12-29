import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import ErrorContainer from 'containers/error/ErrorContainer';

/**
 * @author hoons
 * @email dudgns0612@gmail.com
 * @create date 2020-12-30 00:31:40
 * @modify date 2020-12-30 00:31:56
 * @desc [토큰 만료 에러 페이지 컴포넌트]
 */
function TokenNullErrorPage() {
  const history = useHistory();

  const handlePageMoveClick = useCallback(() => {
    history.push('/login');
  }, [history]);

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
