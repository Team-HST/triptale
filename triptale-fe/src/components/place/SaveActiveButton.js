import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

// 장소 등록 단계
const steps = ['기본정보', '잠소검색', '등록완료'];

function SaveActiveButton({ activeStep, onNextClick, onBackClick }) {
  const classes = useStyles();

  return (
    <div className={classes.buttons}>
      {activeStep !== 0 && (
        <Button
          className={classes.button}
          variant="contained"
          color="secondary"
          onClick={onBackClick}
        >
          이전
        </Button>
      )}
      <Button className={classes.button} variant="contained" color="primary" onClick={onNextClick}>
        {activeStep === steps.length - 1 ? '확인' : '다음'}
      </Button>
    </div>
  );
}

SaveActiveButton.propTypes = {
  activeStep: PropTypes.number.isRequired,
  onNextClick: PropTypes.func,
  onBackClick: PropTypes.func,
};

export default SaveActiveButton;
