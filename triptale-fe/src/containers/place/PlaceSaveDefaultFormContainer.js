import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as PlaceActions from 'store/modules/daySchedulePlace';
import DateUtils from 'utils/DateUtils';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import { makeStyles } from '@material-ui/core/styles';
import SaveActiveButton from 'components/place/SaveActiveButton';

const useStyles = makeStyles((theme) => ({
  timeWapper: {
    marginTop: theme.spacing(2),
  },
  timeGrid: {
    textAlign: 'center',
  },
  timeInput: {
    width: '95%',
  },
  radioWrapper: {
    marginTop: theme.spacing(2),
  },
  radioGroup: {
    justifyContent: 'center',
  },
}));

/**
 * @author hoons
 * @email dudgns0612@gmail.com
 * @create date 2021-01-16 19:15:21
 * @modify date 2021-01-18 22:26:44
 * @desc [일차 별 장소등록 기본 폼]
 */
function PlaceSaveDefaultFormContainer() {
  const classes = useStyles();
  const { savePlace, activeStep } = useSelector((state) => state.daySchedulePlace);
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('1');
  const [startAt, setStartAt] = useState('00:00');
  const [endAt, setEndAt] = useState('24:00');

  // 장소 명 변경 이벤트
  const handleTitleChange = useCallback((e) => {
    setTitle(e.target.value);
  }, []);

  // 장소 설명 변경 이벤트
  const handleDescriptionChange = useCallback((e) => {
    setDescription(e.target.value);
  }, []);

  // 시작 시간 변경 이벤트
  const handleStartTime = useCallback(
    (e) => {
      if (DateUtils.getStrTimeDifference(e.target.value, endAt) > 0) {
        alert('시작 시간은 종료 시간보다 적을 수 없습니다.');
        return;
      }

      setStartAt(e.target.value);
    },
    [endAt]
  );

  // 종료 시간 변경 이벤트
  const handleEndTime = useCallback(
    (e) => {
      if (DateUtils.getStrTimeDifference(startAt, e.target.value) > 0) {
        alert('종료 시간은 시작 시간보다 적을 수 없습니다.');
        return;
      }

      setEndAt(e.target.value);
    },
    [startAt]
  );

  // 장소 타입 변경 이벤트
  const handleTypeChange = useCallback((e) => {
    setType(e.target.value);
  }, []);

  const handleNextClick = () => {
    if (!title) {
      alert('장소 명을 입력하여 주세요.');
      return;
    } else if (startAt > endAt) {
      alert('정확한 시간을 입력하여 주세요.');
      return;
    }

    dispatch(
      PlaceActions.setSavePlace({
        title,
        description,
        type: Number(type),
        startAt,
        endAt,
      })
    );
    dispatch(PlaceActions.setActiveStep(activeStep + 1));
  };

  useEffect(() => {
    const { title, description, type, startAt, endAt } = savePlace;

    setTitle(title ? title : '');
    setDescription(description ? description : '');
    setType(type ? String(type) : '1');
    setStartAt(startAt ? startAt : '00:00');
    setEndAt(endAt ? endAt : '23:59');
  }, [savePlace]);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        기본정보
      </Typography>
      <Grid container>
        <Grid item xs={12} sm={12}>
          <TextField
            required
            label="장소제목"
            value={title}
            fullWidth
            autoComplete="given-name"
            onChange={(e) => handleTitleChange(e)}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            label="장소설명"
            value={description}
            multiline
            rows={2}
            fullWidth
            autoComplete="given-name"
            onChange={(e) => handleDescriptionChange(e)}
          />
        </Grid>
        <Grid className={classes.timeWapper} container>
          <Grid className={classes.timeGrid} item xs={6} sm={6}>
            <TextField
              required
              className={classes.timeInput}
              label="시작 시간"
              type="time"
              value={startAt}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, // 5 min
              }}
              onChange={(e) => handleStartTime(e)}
            />
          </Grid>
          <Grid className={classes.timeGrid} item xs={6} sm={6}>
            <TextField
              required
              className={classes.timeInput}
              label="종료 시간"
              type="time"
              value={endAt}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, // 5 min
              }}
              onChange={(e) => handleEndTime(e)}
            />
          </Grid>
        </Grid>
        <Grid className={classes.radioWrapper} item xs={12} sm={12}>
          <FormLabel component="legend">타입선택 *</FormLabel>
          <RadioGroup
            className={classes.radioGroup}
            area-label="placeType"
            name="placeType"
            value={type}
            row
            onChange={(e) => handleTypeChange(e)}
          >
            <FormControlLabel value="1" control={<Radio />} label="장소" />
            <FormControlLabel value="2" control={<Radio />} label="숙소" />
          </RadioGroup>
        </Grid>
      </Grid>
      <SaveActiveButton activeStep={activeStep} onNextClick={handleNextClick} />
    </>
  );
}

export default PlaceSaveDefaultFormContainer;
