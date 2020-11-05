import React, { useCallback, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import TripCard from 'components/main/TripCard';

import * as TripActions from 'store/modules/trip';
import { useSelector, useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));

/**
 * @author hoons
 * @email dudgns0612@gmail.com
 * @create date 2020-11-05 23:51:39
 * @modify date 2020-11-05 23:52:13
 * @desc [여행 목록 컨테이너 컴포넌트]
 */
function TripListContainer() {
  const classes = useStyles();
  const { tripList } = useSelector((state) => ({ tripList: state.trip.list }));
  const dispatch = useDispatch();

  // 여행 목록 조회 메서드
  const getTripList = useCallback(() => {
    dispatch(TripActions.setTripListAsync());
  }, [dispatch]);

  // 여행 선택 이벤트
  const handleTripCardClick = (trip) => {
    console.log(trip);
  };

  // 유저 여행 목록 조회
  useEffect(() => {
    getTripList();
  }, [dispatch, getTripList]);

  return (
    <Container className={classes.cardGrid} maxWidth="lg">
      <Grid container spacing={2}>
        {tripList.map((trip) => (
          <Grid key={trip.no} item xs={12} sm={6} md={4}>
            <TripCard trip={trip} handleTripCardClick={handleTripCardClick} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default TripListContainer;
