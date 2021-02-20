import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Map from 'components/kakaoMap/Map';
import IconMarker from 'components/kakaoMap/IconMarker';
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
 * @modify date 2021-02-20 16:44:42
 * @desc [일자 별 장소 지도 컨테이너 컴포넌트]
 */
function PlaceMapContainer() {
  const classes = useStyles();
  const [dayPlaces, setDayPlaces] = useState([]);
  const { map, daySchedules } = useSelector((state) => state.daySchedule);

  useEffect(() => {
    const dayPlaces = daySchedules.map((dayPlace) => ({
      color: dayPlace.colorCode,
      ...dayPlace.places,
    }));

    setDayPlaces(dayPlaces);
  }, [daySchedules]);

  return (
    <Map className={classes.map} options={map}>
      {dayPlaces.map((dayPlace) =>
        dayPlace.places.map((place) => (
          <IconMarker
            key={place.placeNo}
            options={{
              position: [place.latitude, place.longitude],
              icon: require(`styles/images/day_place_${dayPlace.color}.png`),
              size: 30,
            }}
          />
        ))
      )}
    </Map>
  );
}

export default PlaceMapContainer;
