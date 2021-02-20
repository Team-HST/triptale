import { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { MapContext } from './Map';
/*global kakao*/

/**
 * @author hoons
 * @email dudgns0612@gmail.com
 * @create date 2021-01-14 22:03:30
 * @modify date 2021-02-20 15:55:20
 * @desc [아이콘 마커 생성 컴포넌트]
 */
function IconMarker({ options, onClick }) {
  const [iconMarker, setIconMarker] = useState(new kakao.maps.Marker());

  const map = useContext(MapContext);

  useEffect(() => {
    const icon = new kakao.maps.MarkerImage(
      options.icon,
      new kakao.maps.Size(options.size, options.size),
      {
        offset: new kakao.maps.Point(16, 34),
        alt: options.type === 1 ? '장소' : '숙소',
        shape: 'poly',
        coords: '1,20,1,9,5,2,10,0,21,0,27,3,30,9,30,20,17,33,14,33',
      }
    );

    const iconMarker = new kakao.maps.Marker({
      position: new kakao.maps.LatLng(options.position[0], options.position[1]),
      image: icon,
    });

    setIconMarker(iconMarker);
  }, [map, options]);

  useEffect(() => {
    iconMarker.setMap(map);

    return () => {
      iconMarker.setMap(null);
    };
  }, [iconMarker, map]);

  useEffect(() => {
    if (onClick) {
      kakao.maps.event.addListener(iconMarker, 'click', onClick);
      return () => {
        kakao.maps.event.removeListener(iconMarker, 'click', onClick);
      };
    }
  }, [iconMarker, onClick]);

  return null;
}

IconMarker.propTypes = {
  options: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};

export default IconMarker;
