import React from 'react';
import Button from '@material-ui/core/Button';

function LoginContainer() {
  return (
    <React.Fragment>
      <Button variant="contained">Default</Button>
      <Button variant="contained" color="primary">
        Primary
      </Button>
      <div>Login</div>
    </React.Fragment>
  );
}

export default LoginContainer;
