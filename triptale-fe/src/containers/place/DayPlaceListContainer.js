import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as PlaceActions from 'store/modules/daySchedulePlace';
import { dayScheduleService } from 'lib/axios/services';
import PlaceSaveModalContainer from 'containers/place/PlaceSaveModalContainer';
import PlaceInfoModalContainer from 'containers/place/PlaceInfoModalContainer';
import PlaceListItem from 'components/place/PlaceListItem';
import ModalLayout from 'components/common/ModalLayout';
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

/**
 * @author hoons
 * @email dudgns0612@gmail.com
 * @create date 2021-01-15 00:32:05
 * @modify date 2021-01-15 00:32:05
 * @desc [장소 목록 표출 컨테이너 컴포넌트]
 */
function DayPlaceListContainer() {
  const classes = useStyles();
  const [label, setLabel] = useState('등록');
  const [isSaveModal, setIsSaveModal] = useState(false);
  const [isInfoModal, setIsInfoModal] = useState(false);
  const [selectPlace, setSelectPlace] = useState({});
  const { dayPlaces } = useSelector((state) => ({ dayPlaces: state.daySchedulePlace.dayPlaces }));
  const dispatch = useDispatch();
  const { srno, daySrno } = useParams();

  // 여행 목록 조회
  const getPlaceList = useCallback(() => {
    dispatch(PlaceActions.setDayPlacesAsync(srno, daySrno));
  }, [dispatch, srno, daySrno]);

  // 여행 삭제
  const deletePlace = useCallback(
    async (placeNo) => {
      try {
        const response = await dayScheduleService.deleteDaySchedulePlace(srno, daySrno, placeNo);
        if (response.placeNo > 0) {
          getPlaceList();
        }
      } catch (error) {
        console.error(error.response.data);
      }
    },
    [getPlaceList, srno, daySrno]
  );

  // 목록 장소 아이템 클릭 이벤트
  const handleListClick = useCallback(
    (position) => {
      dispatch(PlaceActions.setMap({ center: position, level: 3 }));
    },
    [dispatch]
  );

  // 장소 정보 팝업 표출 이벤트
  const handleInfoClick = useCallback((e, place) => {
    e.stopPropagation();
    setSelectPlace(place);
    setIsInfoModal(true);
  }, []);

  // 장소 등록 버튼 이벤트
  const handleCreateBtnClick = useCallback(() => {
    setLabel('등록');
    setIsSaveModal(true);
  }, []);

  // 장소 수정 이벤트
  const handleModifyPlaceClick = useCallback(() => {
    dispatch(PlaceActions.setSavePlace(selectPlace));
    setLabel('수정');
    setIsSaveModal(true);
  }, [dispatch, selectPlace]);

  // 장소 삭제 이벤트
  const handleDeletePlaceClick = useCallback(
    (placeNo) => {
      if (window.confirm('장소를 삭제하시겠습니까?')) {
        deletePlace(placeNo);
        setIsInfoModal(false);
      }
    },
    [deletePlace]
  );

  // 장소 등록, 수정 모달 닫기 이벤트
  const handleCloseSaveModalClick = useCallback(() => {
    // 등록, 수정 단계 및 데이터 초기화
    dispatch(PlaceActions.setActiveStep(0));
    dispatch(PlaceActions.initSavePlace());
    setIsSaveModal(false);
  }, [dispatch]);

  // 장소 상세 모달 닫기
  const handleClosePlaceModalClick = useCallback(() => {
    setIsInfoModal(false);
    setSelectPlace({});
  }, []);

  useEffect(() => {
    dispatch(PlaceActions.setTripAsync(srno));
    dispatch(PlaceActions.setDayPlacesAsync(srno, daySrno));
  }, [dispatch, daySrno, srno]);

  return (
    <>
      <div className={classes.root}>
        <PageExplanHeader
          className={classes.headerPaper}
          explan="당신의 여행 일차 별 장소 및 숙소를 자유롭게 설정하여 보세요!"
          avatar="P"
          button="장소등록"
          onButtonClick={handleCreateBtnClick}
        />
        {dayPlaces.length > 0 && (
          <List className={classes.list}>
            {dayPlaces.map((place, index) => {
              return (
                <React.Fragment key={place.placeNo}>
                  <PlaceListItem
                    place={place}
                    onListClick={handleListClick}
                    onInfoClick={(e) => handleInfoClick(e, place)}
                  />
                  {index !== dayPlaces.length - 1 && (
                    <Divider className={classes.divider} light={true} />
                  )}
                </React.Fragment>
              );
            })}
          </List>
        )}
      </div>
      <ModalLayout open={isSaveModal} onClose={handleCloseSaveModalClick}>
        <PlaceSaveModalContainer
          place={selectPlace}
          label={label}
          onClose={handleCloseSaveModalClick}
        />
      </ModalLayout>
      <ModalLayout open={isInfoModal}>
        <PlaceInfoModalContainer
          place={selectPlace}
          onClosePlaceModalClick={handleClosePlaceModalClick}
          onPlaceModifyClick={handleModifyPlaceClick}
          onPlcaeDeleteClick={handleDeletePlaceClick}
        />
      </ModalLayout>
    </>
  );
}

export default DayPlaceListContainer;
