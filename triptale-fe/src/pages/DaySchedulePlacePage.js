import React from 'react';
import DayPlaceListContainer from 'containers/place/DayPlaceListContainer';
import PlaceMapContainer from 'containers/place/PlaceMapContainer';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
}));

/**
 * @author hoons
 * @email dudgns0612@gmail.com
 * @create date 2020-12-30 00:31:12
 * @modify date 2021-01-10 16:54:42
 * @desc [일차별 장소 등록, 수정 페이지 컴포넌트]
 */
function DaySchedulePlacePage() {
  const classes = useStyles();

  return (
    <>
      <DayPlaceListContainer />
      <div className={classes.root}>
        <PlaceMapContainer />
      </div>
    </>
  );
}

export default DaySchedulePlacePage;
