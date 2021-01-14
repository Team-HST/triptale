import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Map from 'components/kakaoMap/Map';
import IconMarker from 'components/kakaoMap/IconMarker';
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
 * @modify date 2021-01-15 00:20:50
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

  const handleMarkerClick = () => {
    alert('해당 장소, 숙소 정보 팝업 표출');
  };

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
        <IconMarker
          key={place.placeNo}
          options={{ type: place.type, position: [place.latitude, place.longitude] }}
          onClick={handleMarkerClick}
        />
      ))}
    </Map>
  );
}

export default PlaceMapContainer;
