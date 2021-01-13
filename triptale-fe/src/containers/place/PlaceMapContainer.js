import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Map from 'components/kakaoMap/Map';
import Marker from 'components/kakaoMap/Marker';
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
 * @modify date 2021-01-13 21:46:48
 * @desc [일차 별 여행 등록, 수정 지도 컨테이너]
 */
function PlaceMapContainer() {
  const classes = useStyles();
  const { map, trip, dayPlaces } = useSelector((state) => ({
    map: state.daySchedulePlace.map,
    trip: state.daySchedulePlace.trip,
    dayPlaces: state.daySchedulePlace.dayPlaces,
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      PlaceActions.setMap({
        center: [trip.latitude, trip.longitude],
      }),
    );
  }, [dispatch, trip.latitude, trip.longitude]);

  return (
    <Map className={classes.map} options={map}>
      {dayPlaces.map((place) => (
        <Marker key={place.placeNo} options={{ position: [place.latitude, place.longitude] }} />
      ))}
    </Map>
  );
}

export default PlaceMapContainer;
