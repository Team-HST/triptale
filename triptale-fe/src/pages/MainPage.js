import React from 'react';
import ImageBannerContainer from 'containers/main/ImageBannerContainer';
import TripCardContainer from 'containers/main/TripCardContainer';

function MainPage() {
  return (
    <React.Fragment>
      <ImageBannerContainer />
      <TripCardContainer />
    </React.Fragment>
  );
}

export default MainPage;
