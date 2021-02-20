import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';

import { weatherService } from 'lib/axios/services';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
      backgroundPosition: 'center',
    width: '100%',
    height: '100%'
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '300px',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  kakao_login: {
    marginTop: '50px',
    cursor: 'pointer',
    '&:hover': { opacity: '0.8' },
  },
}));

/**
 * @author hoons
 * @email [dudgns0612@gmail.com]
 * @create date 2020-11-05 23:38:26
 * @modify date 2020-11-05 23:38:26
 * @desc [로그인 컨테이너]
 */
function LoginContainer() {
  const [backgroundImage, setBackgroundImage] = useState('');

  useEffect(()=>{
    weatherService.getCurrentWeatherType().then(e => {
      setBackgroundImage(`background/${e.toLowerCase()}/${Math.floor(Math.random() * 3)}.jpeg`);
    });
  },[])


  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={12} sm={8} md={8}>
        <img className={classes.image} src={backgroundImage} />
      </Grid>
      <Grid item xs={12} sm={4} md={4} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <a
            href={`http://${process.env.REACT_APP_SERVER_IP}:${process.env.REACT_APP_SERVER_PORT}/oauth2/authorization/kakao`}
          >
            <img
              className={classes.kakao_login}
              src={require('styles/images/kakao_login_medium_wide.png')}
              alt="카카오 로그인"
            />
          </a>
        </div>
      </Grid>
    </Grid>
  );
}

export default LoginContainer;
