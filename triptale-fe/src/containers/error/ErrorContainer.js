import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import ErrorIcon from '@material-ui/icons/Error';
import Button from '@material-ui/core/Button';
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
    marginTop: theme.spacing(25),
  },
}));

/**pπ
 * @author hoons
 * @email dudgns0612@gmail.com
 * @create date 2020-12-21 20:18:20
 * @modify date 2020-12-21 20:18:20
 * @desc [description]
 */
function ErrorContainer({ errorCode, title, subTitle, button }) {
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
            <h1>{errorCode} ERROR</h1>
          </Grid>
        </Grid>
        <Typography className={classes.errorContent} variant="h5" align="center">
          {title}
        </Typography>
        <Typography variant="h6" align="center">
          {subTitle}
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          size="large"
          startIcon={<ArrowBackIcon />}
          onClick={button.onClick}
        >
          {button.title}
        </Button>
      </div>
    </Container>
  );
}

ErrorContainer.propTypes = {
  btnEl: PropTypes.object,
};

export default ErrorContainer;
