import React, { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import DayCard from 'components/daySchedule/DayCard';

import * as DayScheduleActions from 'store/modules/daySchedule';

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
    [theme.breakpoints.down('md')]: {
      fontSize: '12px',
    },
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
  const { daySchedules } = useSelector((state) => ({
    daySchedules: state.daySchedule.daySchedules,
  }));
  const dispatch = useDispatch();

  // 여행 일자 별 목록 조회
  const getDaySchedules = useCallback(
    (srno) => {
      dispatch(DayScheduleActions.setDaySchedulesAsync(srno));
    },
    [dispatch],
  );

  useEffect(() => {
    getDaySchedules(srno);
  }, [getDaySchedules, srno]);

  return (
    <Container>
      <Paper className={classes.headerPaper}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar className={classes.avatar}>T</Avatar>
          </Grid>
          <Grid item>
            <Typography variant="subtitle2">
              오른쪽 추가하기 버튼을 눌러 여행 일자 별 장소, 숙소를 등록하고
            </Typography>
            <Typography variant="subtitle2">
              당신의 여행의 이야기를 자유롭게 표출하여 보세요.
            </Typography>
          </Grid>
          <Grid item>
            <Button className={classes.addButton} size="small" variant="outlined">
              추가하기
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <Grid className={classes.dayContainer} container>
        <Grid item xs={12}>
          <DayCard order={1} description={'1일차 입니다.'} date={'2020-11-21'} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default DayListContainer;
