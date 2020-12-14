import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import Map from 'components/kakaoMap/Map';

const useStyles = makeStyles((theme) => ({
  map: {
    height: '100%',
  },
}));

/**
 * @author hoons
 * @email dudgns0612@gmail.com
 * @create date 2020-12-03 00:16:47
 * @modify date 2020-12-14 22:42:42
 * @desc [일자 별 장소 지도 컨테이너 컴포넌트]
 */
function PlaceMapContainer() {
  const classes = useStyles();
  const { map } = useSelector((state) => ({ map: state.daySchedule.map }));

  return <Map className={classes.map} options={map}></Map>;
}

export default PlaceMapContainer;
