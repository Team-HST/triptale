import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    [theme.breakpoints.up('sm')]: {
      width: '40%',
      height: '20%',
    },
    [theme.breakpoints.up('lg')]: {
      width: '30%',
      height: '20%',
    },
    width: '90%',
    height: '22%',
    backgroundColor: theme.palette.background.paper,
    textAlign: 'center',
  },
  modal: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  header: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  footerBtn: {
    marginTop: theme.spacing(2),
  },
  closeBtn: {
    marginLeft: theme.spacing(1),
  },
}));

/**
 * @author hoons
 * @email dudgns0612@gmail.com
 * @create date 2020-12-10 23:50:19
 * @modify date 2020-12-10 23:50:19
 * @desc [여행 일차 등록 수정 모달 컨테이너]
 */
function DaySaveModalContainer({ label, onSaveModalClose }) {
  const classes = useStyles();

  return (
    <div className={clsx(classes.paper, classes.modal)}>
      <Grid container spacing={2} justify="center">
        <Grid className={classes.header} item xs={12}>
          <Typography variant="h6">TripTale! 일차 {label}</Typography>
        </Grid>
        <Grid item xs={10}>
          <TextField
            className={classes.textField}
            name="title"
            required
            label="일차 설명"
            fullWidth
          />
        </Grid>
      </Grid>
      <div className={classes.footerBtn}>
        <Button variant="contained" color="primary">
          일차 {label}
        </Button>
        <Button
          className={classes.closeBtn}
          variant="contained"
          color="secondary"
          onClick={onSaveModalClose}
        >
          닫기
        </Button>
      </div>
    </div>
  );
}

DaySaveModalContainer.propTypes = {
  label: PropTypes.string,
  onSaveModalClose: PropTypes.func,
};

export default DaySaveModalContainer;
