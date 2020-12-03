import React from 'react';
import DayListContainer from 'containers/daySchedule/DayListContainer';
import PlaceMapContainer from 'containers/daySchedule/PlaceMapContainer';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  containerItem: {
    padding: theme.spacing(2),
  },
}));

/**
 * @author hoons
 * @email dudgns0612@gmail.com
 * @create date 2020-12-03 00:15:39
 * @modify date 2020-12-03 23:32:36
 * @desc [일자 별 정보 페이지 컴포넌트]
 */
function DaySchedulePage() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Grid className={classes.root} container>
        <Grid className={classes.containerItem} item xs={12} sm={5} md={5}>
          <DayListContainer />
        </Grid>
        <Grid item xs={12} sm={7} md={7}>
          <PlaceMapContainer />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default DaySchedulePage;
