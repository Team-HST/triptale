import { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { MapContext } from './Map';

/**
 * @author hoons
 * @email dudgns0612@gmail.com
 * @create date 2020-11-15 19:47:52
 * @modify date 2020-11-16 21:08:21
 * @desc [서클 생성 컴포넌트]
 */
function Circle({ options }) {
  const { kakao } = window;
  const map = useContext(MapContext);
  const [circle, setCircle] = useState(
    new kakao.maps.Circle({
      ...options,
      center: new kakao.maps.LatLng(options.center[0], options.center[1]),
    }),
  );

  useEffect(() => {
    circle.setMap(map);

    return () => {
      circle.setMap(null);
    };
  }, [map, circle]);

  useEffect(() => {
    setCircle(
      new kakao.maps.Circle({
        ...options,
        center: new kakao.maps.LatLng(options.center[0], options.center[1]),
      }),
    );
  }, [kakao.maps.Circle, kakao.maps.LatLng, options]);

  return null;
}

Circle.protoTypes = {
  options: PropTypes.object.isRequired,
};

export default Circle;
