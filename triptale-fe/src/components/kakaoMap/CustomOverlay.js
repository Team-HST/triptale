import { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { MapContext } from './Map';
/*global kakao*/

/**
 * @author hoons
 * @email dudgns0612@gmail.com
 * @create date 2020-11-15 19:48:18
 * @modify date 2021-02-20 14:00:21
 * @desc [커스텀 오버레이 생성 컴포넌트]
 */
function CustomOverlay({ options }) {
  const map = useContext(MapContext);
  const [overlay, setOverlay] = useState(
    new kakao.maps.CustomOverlay({
      ...options,
      position: new kakao.maps.LatLng(options.position[0], options.position[1]),
    })
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
