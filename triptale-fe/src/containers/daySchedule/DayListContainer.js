import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import * as DayScheduleActions from 'store/modules/daySchedule';

import ModalLayout from 'components/common/ModalLayout';
import DaySaveModalContainer from 'containers/daySchedule/DaySaveModalContainer';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import DayCard from 'components/daySchedule/DayCard';

import { dayScheduleService } from 'lib/axios/services';
import DateUtils from 'utils/DateUtils';

const useStyles = makeStyles((theme) => ({
  headerPaper: {
    maxWidth: '80%',
    margin: `${theme.spacing(0.5)}px auto`,
    padding: theme.spacing(2),
    backgroundColor: 'whitesmoke',
  },
  avatar: {
    backgroundColor: 'green',
  },
  addButton: {
    fontSize: '12px',
    color: 'green',
    borderColor: 'green',
  },
  dayContainer: {
    maxWidth: '85%',
    margin: `${theme.spacing(0.2)}px auto`,
    marginTop: '25px',
  },
}));

/**
 * @author hoons
 * @email dudgns0612@gmail.com
 * @create date 2020-12-03 00:16:24
 * @modify date 2020-12-03 22:31:31
 * @desc [일자 별 목록 컨테이너 컴포넌트]
 */
function DayListContainer() {
  const classes = useStyles();
  const { srno } = useParams();
  // 여행 등록 / 수정 모달 표출 여부
  const [isDayScheduleSave, setIsDayScheduleSave] = useState(false);
  const [selectDayShedule, setSelectDaySchedule] = useState();
  const [saveLabel, setSaveLabel] = useState('');
  const { daySchedules, trip } = useSelector((state) => ({
    trip: state.daySchedule.trip,
    daySchedules: state.daySchedule.daySchedules,
  }));
  const dispatch = useDispatch();

  // 선택 여행 정보 조회
  const gettTrip = useCallback(
    (srno) => {
      dispatch(DayScheduleActions.setTripAsync(srno));
    },
    [dispatch],
  );

  // 여행 일자 별 목록 조회
  const getDaySchedules = useCallback(
    (srno) => {
      dispatch(DayScheduleActions.setDaySchedulesAsync(srno));
    },
    [dispatch],
  );

  // 일차 등록 모달 표출 이벤트
  const handleDayAddClick = useCallback(() => {
    const differnceDay =
      Math.abs(DateUtils.getStrDayDifference(new Date(trip.startAt), new Date(trip.endAt))) + 1;

    // 일차 갯수 제한 검사
    if (differnceDay === daySchedules.length) {
      alert('더이상 일차를 추가할 수 없습니다.');
      return;
    }
    setSaveLabel('등록');
    setIsDayScheduleSave(true);
  }, [daySchedules.length, trip.endAt, trip.startAt]);

  // 일차 등록, 수정 모달 종료 이벤트
  const handleSaveModalClose = useCallback(() => {
    setIsDayScheduleSave(false);
    setSelectDaySchedule(null);
    getDaySchedules(srno);
  }, [getDaySchedules, srno]);

  // 일차 수정 이벤트
  const handleDayModifyClick = (daySchedule) => {
    setSaveLabel('수정');
    setSelectDaySchedule(daySchedule);
    setIsDayScheduleSave(true);
  };

  // 일차 삭제 이벤트
  const handleDayDeleteClick = async (daySchedule) => {
    if (window.confirm('일차를 삭제하시겠습니까?')) {
      await dayScheduleService.deleteDaySchedule(trip.no, daySchedule.no);
      getDaySchedules(srno);
    }
  };

  useEffect(() => {
    dispatch(
      DayScheduleActions.setMap({
        mapId: 'tripDayMap',
        center: [trip.latitude, trip.longitude],
        level: 8,
      }),
    );
  }, [dispatch, trip]);

  useEffect(() => {
    getDaySchedules(srno);
    gettTrip(srno);
  }, [getDaySchedules, gettTrip, srno]);

  return (
    <React.Fragment>
      <Container>
        <Paper className={classes.headerPaper}>
          <Grid container wrap="nowrap" spacing={2}>
            <Grid item md={2}>
              <Avatar className={classes.avatar}>T</Avatar>
            </Grid>
            <Grid item md={9}>
              <Typography variant="subtitle2">
                오른쪽 추가하기 버튼을 눌러 여행 일자 별 장소, 숙소를 등록하고 당신의 여행의
                이야기를 자유롭게 표출하여 보세요.
              </Typography>
            </Grid>
            <Grid item md={2}>
              <Button
                className={classes.addButton}
                size="small"
                variant="outlined"
                onClick={handleDayAddClick}
              >
                추가하기
              </Button>
            </Grid>
          </Grid>
        </Paper>
        <Grid className={classes.dayContainer} container>
          {daySchedules.map((daySchedule) => (
            <Grid key={daySchedule.order} item xs={12}>
              <DayCard
                daySchedule={daySchedule}
                onDayModifyClick={handleDayModifyClick}
                onDeleteDaySchedule={handleDayDeleteClick}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
      <ModalLayout open={isDayScheduleSave} onClose={handleSaveModalClose}>
        <DaySaveModalContainer
          daySchedule={selectDayShedule}
          label={saveLabel}
          onSaveModalClose={handleSaveModalClose}
        />
      </ModalLayout>
    </React.Fragment>
  );
}

export default DayListContainer;
