import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { tripService } from 'lib/axios/services';
import * as TripActions from 'store/modules/trip';
import ModalLayout from 'components/common/ModalLayout';
import TripInfoModalContainer from 'containers/main/TripInfoModalContainer';
import TripSaveModalContainer from 'containers/main/TripSaveModalContainer';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TripCard from 'components/main/TripCard';

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));

/**
 * @author hoons
 * @email dudgns0612@gmail.com
 * @create date 2020-11-05 23:51:39
 * @modify date 2020-11-16 22:49:07
 * @desc [여행 목록 컨테이너 컴포넌트]
 */
function TripListContainer() {
  const classes = useStyles();
  // 선택 여행 정보
  const [selectTrip, setSelectTrip] = useState({});
  // 여행 상세 모달 표출 여부
  const [isTripInfo, setIsTripInfo] = useState(false);
  // 여행 수정 모달 료출 여부
  const [isTripModify, setIsTripModify] = useState(false);
  const { tripList } = useSelector((state) => ({ tripList: state.trip.list }));
  const history = useHistory();
  const dispatch = useDispatch();

  // 여행 목록 조회
  const getTripList = useCallback(() => {
    dispatch(TripActions.setTripListAsync());
  }, [dispatch]);

  // 여행 상세 조회
  const getTrip = async (tripNo) => {
    const trip = await tripService.searchTrip(tripNo);
    setSelectTrip(trip);
  };

  // 여행 삭제
  const deleteTrip = useCallback(
    async (tripNo) => {
      const deleteTripNo = await tripService.deleteTrip(tripNo);
      if (deleteTripNo > 0) {
        getTripList();
      }
    },
    [getTripList]
  );

  // 여행 선택 이벤트
  const handleTripCardClick = useCallback(
    (trip) => {
      history.push(`/trip/${trip.no}`);
    },
    [history]
  );

  // 여행 정보 표출 이벤트
  const handleTripInfoClick = useCallback((trip) => {
    setSelectTrip(trip);
    setIsTripInfo(true);
  }, []);

  // 여행 삭제 이벤트
  const handleTripDeleteClick = useCallback(
    (tripNo) => {
      if (window.confirm('여행을 삭제하시겠습니까?')) {
        deleteTrip(tripNo);
        setIsTripInfo(false);
      }
    },
    [deleteTrip]
  );

  // 여행 정보 표출 종료 이벤트
  const handleCloseInfoModalClick = useCallback(() => {
    setIsTripInfo(false);
  }, []);

  // 여행 수정 표출 이벤트
  const handleModifyClick = useCallback(() => {
    setIsTripModify(true);
  }, []);

  // 여행 수정 종료 이벤트
  const handleCloseModifyModalClick = useCallback(() => {
    getTrip(selectTrip.no);
    getTripList();
    setIsTripModify(false);
  }, [getTripList, selectTrip.no]);

  // 유저 여행 목록 조회
  useEffect(() => {
    getTripList();
  }, [dispatch, getTripList]);

  return (
    <>
      <Container className={classes.cardGrid} maxWidth="lg">
        <Grid container spacing={2}>
          {tripList.map((trip) => (
            <Grid key={trip.no} item xs={12} sm={6} md={4}>
              <TripCard
                trip={trip}
                onTripCardClick={handleTripCardClick}
                onTripInfoClick={handleTripInfoClick}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
      <ModalLayout open={isTripInfo} onClose={handleCloseInfoModalClick}>
        <TripInfoModalContainer
          trip={selectTrip}
          onCloseInfoModalClick={handleCloseInfoModalClick}
          onTripModifyClick={handleModifyClick}
          onTripDeleteClick={handleTripDeleteClick}
        />
      </ModalLayout>
      <ModalLayout open={isTripModify} onClose={handleCloseModifyModalClick}>
        <TripSaveModalContainer
          label={'수정'}
          trip={selectTrip}
          onModalCloseClick={handleCloseModifyModalClick}
        />
      </ModalLayout>
    </>
  );
}

export default TripListContainer;
