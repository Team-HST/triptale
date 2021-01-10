import React from 'react';
import ImageBannerContainer from 'containers/main/ImageBannerContainer';
import TripListContainer from 'containers/main/TripListContainer';

/**
 * @author hoons
 * @email dudgns0612@gmail.com
 * @create date 2020-11-05 23:54:08
 * @modify date 2021-01-07 22:50:26
 * @desc [메인 페이지 컴포넌트]
 */
function MainPage() {
  return (
    <>
      <ImageBannerContainer />
      <TripListContainer />
    </>
  );
}

export default MainPage;
