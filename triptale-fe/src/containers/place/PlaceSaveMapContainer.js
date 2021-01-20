import React, { useEffect } from 'react';
import http from 'lib/axios/http';

/**
 * @author hoons
 * @email dudgns0612@gmail.com
 * @create date 2021-01-16 19:14:52
 * @modify date 2021-01-21 00:21:25
 * @desc [일차 별 장소 지도 등록 컴포넌트]
 */
function PlaceSaveMapContainer() {
  useEffect(() => {
    const testAPI = async () => {
      const apiKey = 'a6a97e95b84c218b23e293b7d6f8d6d6';
      const response = await http.get(
        `https://dapi.kakao.com/v2/local/search/keyword.json?query=제주도 넥슨`,
        {
          headers: {
            Authorization: `KakaoAK ${apiKey}`,
          },
        },
      );
    };

    testAPI();
  }, []);

  return <div>map</div>;
}

export default PlaceSaveMapContainer;
