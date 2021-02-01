import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as PlaceActions from 'store/modules/daySchedulePlace';
import Typography from '@material-ui/core/Typography';
import SaveActiveButton from 'components/place/SaveActiveButton';

function PlaceSaveConfirmContainer({ onClose }) {
  const dispatch = useDispatch();
  const { activeStep } = useSelector((state) => state.daySchedulePlace);

  // 확인 step 진행 이벤트
  const handleNextClick = useCallback(() => {
    dispatch(PlaceActions.setActiveStep(0));
    onClose();
  }, [dispatch, onClose]);

  // 이전 step 이동 이벤트
  const handleBackClick = useCallback(() => {
    dispatch(PlaceActions.setActiveStep(activeStep - 1));
  }, [activeStep, dispatch]);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        해당 장소를 등록하시겠습니까?
      </Typography>
      <Typography variant="subtitle1">확인 버튼을 눌러 저장하여 주세요.</Typography>
      <SaveActiveButton
        activeStep={activeStep}
        onNextClick={handleNextClick}
        onBackClick={handleBackClick}
      />
    </>
  );
}

export default PlaceSaveConfirmContainer;
