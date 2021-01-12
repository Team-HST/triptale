import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Map from 'components/kakaoMap/Map';
import * as PlaceActions from 'store/modules/daySchedulePlace';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  map: {
    height: '100%',
  },
}));

/**
 * @author hoons
 * @email dudgns0612@gmail.com
 * @create date 2020-12-30 00:10:00
 * @modify date 2021-01-13 00:41:02
 * @desc [일차 별 여행 등록, 수정 지도 컨테이너]
 */
function PlaceMapContainer() {
  const classes = useStyles();
  const { map, trip } = useSelector((state) => ({
    trip: state.daySchedulePlace.trip,
    map: state.daySchedulePlace.map,
  }));
  const dispatch = useDispatch();
  const { srno, daySrno } = useParams();

  useEffect(() => {
    dispatch(PlaceActions.setTripAsync(srno));
  }, [dispatch, srno]);

  useEffect(() => {
    dispatch(
      PlaceActions.setMap({
        center: [trip.latitude, trip.longitude],
      }),
    );
  }, [dispatch, trip]);

  return <Map className={classes.map} options={map}></Map>;
}

export default PlaceMapContainer;
