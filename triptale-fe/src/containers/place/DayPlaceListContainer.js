import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as PlaceActions from 'store/modules/daySchedulePlace';
import PlaceListItem from 'components/place/PlaceListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import PageExplanHeader from 'components/common/PageExplanHeader';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    top: 20,
    left: 10,
    bottom: 10,
    zIndex: 10,
    height: '80%',
    [theme.breakpoints.down('md')]: {
      width: '35%',
    },
    [theme.breakpoints.down('xs')]: {
      width: '95%',
    },
    width: '25%',
  },
  headerPaper: {
    maxWidth: '100%',
    marginTop: '10px',
    marginBottom: '15px',
    padding: theme.spacing(2),
    backgroundColor: 'whitesmoke',
  },
  list: {
    maxHeight: '90%',
    backgroundColor: 'white',
    opacity: 0.9,
    overflow: 'auto',
  },
  divider: {
    height: 8,
  },
}));

function DayPlaceListContainer() {
  const classes = useStyles();
  const { dayPlaces } = useSelector((state) => ({ dayPlaces: state.daySchedulePlace.dayPlaces }));
  const dispatch = useDispatch();
  const { srno, daySrno } = useParams();

  useEffect(() => {
    dispatch(PlaceActions.setTripAsync(srno));
    dispatch(PlaceActions.setDayPlacesAsync(srno, daySrno));
  }, [dispatch, daySrno, srno]);

  return (
    <div className={classes.root}>
      <PageExplanHeader
        className={classes.headerPaper}
        explan="당신의 여행 일차 별 장소 및 숙소를 자유롭게 설정하여 보세요!"
        avatar="P"
        button="장소등록"
        // onButtonClick={handleDayAddClick}
      />
      <List className={classes.list}>
        {dayPlaces.map((place, index) => {
          return (
            <React.Fragment key={place.placeNo}>
              <PlaceListItem place={place} />
              {index !== dayPlaces.length - 1 && (
                <Divider className={classes.divider} light={true} />
              )}
            </React.Fragment>
          );
        })}
      </List>
    </div>
  );
}

export default DayPlaceListContainer;
