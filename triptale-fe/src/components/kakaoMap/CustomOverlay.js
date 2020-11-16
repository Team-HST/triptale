import { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { MapContext } from './Map';

/**
 * @author hoons
 * @email dudgns0612@gmail.com
 * @create date 2020-11-15 19:48:18
 * @modify date 2020-11-16 21:07:42
 * @desc [커스텀 오버레이 생성 컴포넌트]
 */
function CustomOverlay({ options }) {
  const { kakao } = window;
  const map = useContext(MapContext);
  const [overlay, setOverlay] = useState(
    new kakao.maps.CustomOverlay({
      ...options,
      position: new kakao.maps.LatLng(options.position[0], options.position[1]),
    }),
  );

  useEffect(() => {
    overlay.setMap(map);

    return () => {
      overlay.setMap(null);
    };
  }, [map, overlay]);

  return null;
}

CustomOverlay.protoTypes = {
  options: PropTypes.object.isRequired,
};

export default CustomOverlay;
