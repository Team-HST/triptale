import { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { MapContext } from './Map';
/*global kakao*/

/**
 * @author hoons
 * @email dudgns0612@gmail.com
 * @create date 2020-11-11 23:27:28
 * @modify date 2020-12-07 22:58:32
 * @desc [마커 생성 컴포넌트]
 */
function Marker({ options, onClick }) {
  const [marker, setMarker] = useState(
    new kakao.maps.Marker({
      position: new kakao.maps.LatLng(options.position[0], options.position[1]),
    }),
  );
  const map = useContext(MapContext);

  useEffect(() => {
    marker.setMap(map);

    return () => {
      marker.setMap(null);
    };
  }, [map, marker]);

  useEffect(() => {
    marker.setPosition(new kakao.maps.LatLng(options.position[0], options.position[1]));
  }, [marker, options]);

  useEffect(() => {
    if (onClick) {
      kakao.maps.event.addListener(marker, 'click', onClick);
      return () => {
        kakao.maps.event.removeListener(marker, 'click', onClick);
      };
    }
  }, [marker, onClick]);

  return null;
}

Marker.propTypes = {
  options: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};

export default Marker;
