import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ErrorIcon from '@material-ui/icons/Error';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(13),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  gridContainer: {
    alignItems: 'center',
  },
  errorContent: {
    marginTop: theme.spacing(20),
    marginBottom: theme.spacing(1),
    fontWeight: 'bold',
  },
  button: {
    marginTop: theme.spacing(28),
  },
}));

function ErrorContainer() {
  const classes = useStyles();

  return (
    <Container component="main">
      <CssBaseline />
      <div className={classes.paper}>
        <Grid className={classes.gridContainer} container justify="center">
          <Grid item>
            <Avatar className={classes.avatar}>
              <ErrorIcon />
            </Avatar>
          </Grid>
          <Grid item>
            <h1>404 ERROR</h1>
          </Grid>
        </Grid>
        <Typography className={classes.errorContent} variant="h5" align="center">
          서비스 이용에 불편을 드려서 죄송합니다.
        </Typography>
        <Typography variant="h6" align="center">
          요청하신 페이지는 TripTale에서 찾을 수 없습니다.
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          size="large"
          startIcon={<ArrowBackIcon />}
          // onClick={handlePageMoveClick}
        >
          메인 페이지로 이동
        </Button>
      </div>
    </Container>
  );
}

export default ErrorContainer;
