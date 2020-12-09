import React from 'react';
import DayListContainer from 'containers/daySchedule/DayListContainer';
import PlaceMapContainer from 'containers/daySchedule/PlaceMapContainer';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  dayListGridItem: {
    [theme.breakpoints.down('sm')]: {
      height: '60%',
    },
    height: '100%',
    padding: theme.spacing(1.5),
    overflow: 'auto',
  },
  mapGridItem: {
    [theme.breakpoints.down('sm')]: {
      height: '40%',
    },
  },
}));

/**
 * @author hoons
 * @email dudgns0612@gmail.com
 * @create date 2020-12-03 00:15:39
 * @modify date 2020-12-08 23:03:01
 * @desc [일자 별 정보 페이지 컴포넌트]
 */
function DaySchedulePage() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Grid className={classes.root} container>
        <Grid className={classes.dayListGridItem} item xs={12} sm={5} md={5}>
          <DayListContainer />
        </Grid>
        <Grid className={classes.mapGridItem} item xs={12} sm={7} md={7}>
          <PlaceMapContainer />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default DaySchedulePage;
