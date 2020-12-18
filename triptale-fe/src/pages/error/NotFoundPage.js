import React from 'react';
import { useHistory } from 'react-router-dom';
import ErrorContainer from 'containers/error/ErrorContainer';

function NotFoundPage() {
  const history = useHistory();

  const handlePageMoveClick = () => {
    history.push('/');
  };

  return (
    <React.Fragment>
      <ErrorContainer />
    </React.Fragment>
  );
}

export default NotFoundPage;
