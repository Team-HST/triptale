import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Map from 'components/kakaoMap/Map';
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
 * @modify date 2020-12-30 00:24:55
 * @desc [일차 별 여행 등록, 수정 지도 컨테이너]
 */
function PlaceMapContainer() {
  const classes = useStyles();
  const { map } = useSelector((state) => ({
    map: state.daySchedulePlace.map,
  }));

  return <Map className={classes.map} options={map}></Map>;
}

export default PlaceMapContainer;
