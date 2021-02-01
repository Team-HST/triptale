import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import PlaceSaveDefaultFormContainer from 'containers/place/PlaceSaveDefaultFormContainer';
import PlaceSaveMapContainer from 'containers/place/PlaceSaveMapContainer';
import PlaceSaveConfirmContainer from 'containers/place/PlaceSaveConfirmContainer';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';

// 장소 등록 단계
const steps = ['기본정보', '잠소검색', '등록완료'];

const useStyles = makeStyles((theme) => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
}));

/**
 * @author hoons
 * @email dudgns0612@gmail.com
 * @create date 2021-01-16 19:14:25
 * @modify date 2021-01-16 19:14:49
 * @desc [일차 별 장소 등록 컴포넌트]
 */
function PlaceSaveModalContainer({ onClose }) {
  const classes = useStyles();
  const { activeStep } = useSelector((state) => state.daySchedulePlace);

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <PlaceSaveDefaultFormContainer />;
      case 1:
        return <PlaceSaveMapContainer />;
      case 2:
        return <PlaceSaveConfirmContainer onClose={onClose} />;
      default:
        throw new Error('Unknown step');
    }
  }

  return (
    <>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <div style={{ display: 'flex' }}>
            <Typography
              component="h5"
              variant="h5"
              align="center"
              style={{ flex: 'auto', marginLeft: '25px' }}
            >
              장소 등록
            </Typography>
            <IconButton
              aria-label="settings"
              style={{ flex: '0', padding: '0', marginBottom: '10px' }}
              onClick={onClose}
            >
              <CloseIcon />
            </IconButton>
          </div>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {getStepContent(activeStep)}
        </Paper>
      </main>
    </>
  );
}

PlaceSaveModalContainer.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default PlaceSaveModalContainer;
