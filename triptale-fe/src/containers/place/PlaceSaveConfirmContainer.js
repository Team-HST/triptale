import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as PlaceActions from 'store/modules/daySchedulePlace';
import SaveActiveButton from 'components/place/SaveActiveButton';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  buttonGroup: {
    magin: 'auto',
  },
}));

function PlaceSaveConfirmContainer({ onClose }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { srno, daySrno } = useParams();
  const { activeStep, savePlace, savePlaceDone, savePlaceError } = useSelector(
    (state) => state.daySchedulePlace
  );

  // 확인 step 진행 이벤트
  const handleNextClick = useCallback(() => {
    dispatch(PlaceActions.saveDayPlaceAsync(srno, daySrno, savePlace));
  }, [daySrno, savePlace, srno, dispatch]);

  // 이전 step 이동 이벤트
  const handleBackClick = useCallback(() => {
    dispatch(PlaceActions.setActiveStep(activeStep - 1));
  }, [activeStep, dispatch]);

  useEffect(() => {
    if (savePlaceDone) {
      alert('장소가 저장되었습니다.');
      onClose();
    }
  }, [dispatch, onClose, savePlaceDone]);

  useEffect(() => {
    if (savePlaceError) {
      alert(savePlaceError.message);
      dispatch(PlaceActions.setActiveStep(0));
      dispatch(PlaceActions.setSavePlaceError(null));
    }
  }, [dispatch, savePlaceError]);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        해당 장소를 등록하시겠습니까?
      </Typography>
      <Typography variant="subtitle1">확인 버튼을 눌러 저장하여 주세요.</Typography>
      <div className={classes.buttonGroup}>
        <SaveActiveButton
          activeStep={activeStep}
          onNextClick={handleNextClick}
          onBackClick={handleBackClick}
        />
      </div>
    </>
  );
}

export default PlaceSaveConfirmContainer;
