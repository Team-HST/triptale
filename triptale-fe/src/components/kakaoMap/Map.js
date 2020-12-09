import React, { useState, useEffect, useCallback, createContext } from 'react';
import PropTypes from 'prop-types';
/*global kakao*/

export const MapContext = createContext();

/**
 * @author hoons
 * @email dudgns0612@gmail.com
 * @create date 2020-11-11 23:26:42
 * @modify date 2020-12-07 22:58:39
 * @desc [지도 생성 컴포넌트]
 */
function Map({ children, className, options }) {
  const [map, setMap] = useState(null);

  const initialize = useCallback(() => {
    const container = document.getElementById(options.mapId);
    setMap(
      new kakao.maps.Map(container, {
        ...options,
        center: new kakao.maps.LatLng(options.center[0], options.center[1]),
      }),
    );
  }, [options]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    if (map) {
      map.setCenter(new kakao.maps.LatLng(options.center[0], options.center[1]));
    }
  }, [map, options]);

  return (
    <MapContext.Provider value={map}>
      <div id={options.mapId} className={className}>
        {children}
      </div>
    </MapContext.Provider>
  );
}

Map.protoTypes = {
  children: PropTypes.node,
  className: PropTypes.object.isRequired,
  options: PropTypes.object.isRequired,
};

export default React.memo(Map);
