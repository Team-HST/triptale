import React from 'react';
import ImageBannerContainer from 'containers/main/ImageBannerContainer';
import TripListContainer from 'containers/main/TripListContainer';

/**
 * @author hoons
 * @email dudgns0612@gmail.com
 * @create date 2020-11-05 23:54:08
 * @modify date 2020-11-05 23:54:19
 * @desc [메인 페이지 컴포넌트]
 */
function MainPage() {
  return (
    <React.Fragment>
      <ImageBannerContainer />
      <TripListContainer />
    </React.Fragment>
  );
}

export default MainPage;
