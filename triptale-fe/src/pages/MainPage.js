import React from 'react';
import EnvNavigationLayout from 'components/common/EnvNavigationLayout';
import ImageBannerContainer from 'containers/main/ImageBannerContainer';
import TripListContainer from 'containers/main/TripListContainer';

/**
 * @author hoons
 * @email dudgns0612@gmail.com
 * @create date 2020-11-05 23:54:08
 * @modify date 2021-02-21 14:51:09
 * @desc [메인 페이지 컴포넌트]
 */
function MainPage() {
  return (
    <EnvNavigationLayout>
      <ImageBannerContainer />
      <TripListContainer />
    </EnvNavigationLayout>
  );
}

export default MainPage;
