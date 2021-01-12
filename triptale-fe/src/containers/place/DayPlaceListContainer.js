import React from 'react';
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
      width: '80%',
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

function DayScheduleListContainer() {
  const dummy = [
    {
      placeNo: 1,
      title: 'test',
      name: '강식당',
      description: '강식당 방문!',
      thumbnailUrl: 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png',
      type: 1,
      startAt: '02:11:11',
      endAt: '11:11:!1',
      latitude: 1.22,
      longitude: 3.22,
    },
    {
      placeNo: 2,
      title: 'test2',
      name: '코카콜라집',
      description: '코카콜라 먹으러!',
      thumbnailUrl: 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png',
      type: 1,
      startAt: '02:11:11',
      endAt: '11:11:!1',
      latitude: 1.22,
      longitude: 3.22,
    },
  ];
  const classes = useStyles();

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
        {dummy.map((v, index) => {
          return (
            <>
              <PlaceListItem key={v.placeNo} place={v} />
              {index !== dummy.length - 1 && <Divider className={classes.divider} light={true} />}
            </>
          );
        })}
      </List>
    </div>
  );
}

export default DayScheduleListContainer;
