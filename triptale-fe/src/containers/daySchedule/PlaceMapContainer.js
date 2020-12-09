import React from 'react';
import { useParams } from 'react-router-dom';
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
 * @create date 2020-12-03 00:16:47
 * @modify date 2020-12-03 23:29:53
 * @desc [일자 별 장소 지도 컨테이너 컴포넌트]
 */
function PlaceMapContainer() {
  const classes = useStyles();
  const { srno } = useParams();

  return (
    <Map
      className={classes.map}
      options={{
        mapId: 'tripDayMap',
        center: [33.450701, 126.570667],
        level: 8,
      }}
    ></Map>
  );
}

export default PlaceMapContainer;
