import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as PlaceActions from 'store/modules/daySchedulePlace';
import SaveActiveButton from 'components/place/SaveActiveButton';
import http from 'lib/axios/http';
import dayScheduleService from 'lib/axios/services/dayScheduleService';
import SearchListItem from 'components/place/SearchListItem';
import Map from 'components/kakaoMap/Map';
import IconMarker from 'components/kakaoMap/IconMarker';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import List from '@material-ui/core/List';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '90%',
    height: '220px',
    overflow: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: theme.palette.background.paper,
  },
  placeImg: {
    width: 110,
    height: 70,
    marginRight: 10,
  },
  listItem: {
    paddingBottom: '0px',
  },
  map: {
    height: '30vh',
  },
  noData: {
    textAlign: 'center',
    height: '220px',
    lineHeight: '5px',
  },
  noDataIcon: {
    verticalAlign: 'text-bottom',
  },
}));

/**
 * @author hoons
 * @email dudgns0612@gmail.com
 * @create date 2021-01-16 19:14:52
 * @modify date 2021-01-21 22:04:27
 * @desc [일차 별 장소 지도 등록 컴포넌트]
 */
function PlaceSaveMapContainer() {
  const classes = useStyles();
  const { savePlace, activeStep } = useSelector((state) => state.daySchedulePlace);
  const dispatch = useDispatch();
  const [map, setMap] = useState({
    mapId: 'placeSaveMap',
    center: [33.450701, 126.570667],
    level: 8,
  });
  const [searchPlaces, setSearchPlaces] = useState([]);
  const [thumnailImgs, setThumnailImgs] = useState([]);
  const [searchText, setSearchText] = useState('');

  // 다음 step 진행 이벤트
  const handleNextClick = useCallback(() => {
    dispatch(PlaceActions.setActiveStep(activeStep + 1));
  }, [activeStep, dispatch]);

  // 이전 step 이동 이벤트
  const handleBackClick = useCallback(() => {
    dispatch(PlaceActions.setActiveStep(activeStep - 1));
  }, [activeStep, dispatch]);

  // 검색 인풋 텍스트 변경
  const handleSearchTextChange = useCallback((e) => {
    setSearchText(e.target.value);
  }, []);

  const onSearchPlace = useCallback(async () => {
    let response = await http.get(
      `https://dapi.kakao.com/v2/local/search/keyword.json?query=${searchText}`,
      {
        headers: {
          Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_API_KEY}`,
        },
      },
    );
    const searchPlaces = response.documents;
    const placeUrls = searchPlaces.map((place) => place.place_url);

    // 섬네일 이미지 조회
    response = await dayScheduleService.searchKakaoPlaceAPIThumbnails(placeUrls);
    setThumnailImgs(response);
    setSearchPlaces(searchPlaces);
  }, [searchText]);

  // 검색 장소 선택
  const handleSearchPlaceClick = useCallback(
    (place) => {
      dispatch(PlaceActions.setSavePlace({ latitude: place.x, longitude: place.y }));
    },
    [dispatch],
  );

  useEffect(() => {
    if (savePlace.latitude && savePlace.longitude) {
      setMap((state) => ({
        ...state.map,
        center: [savePlace.longitude, savePlace.latitude],
        level: 3,
      }));
    }
  }, [savePlace]);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        장소검색
      </Typography>
      <Input
        id="map-search"
        type="text"
        placeholder="장소를 검색하여주세요."
        fullWidth
        value={searchText}
        onChange={(e) => handleSearchTextChange(e)}
        endAdornment={
          <InputAdornment position="end">
            <IconButton aria-label="map search" onClick={onSearchPlace}>
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        }
      />
      {searchPlaces.length > 0 ? (
        <List className={classes.root} disablePadding={true}>
          {searchPlaces.map((place, index) => (
            <SearchListItem
              key={place.id}
              place={place}
              img={thumnailImgs[index]}
              onItemClick={handleSearchPlaceClick}
            />
          ))}
        </List>
      ) : (
        <div className={classes.noData}>
          <Typography variant="subtitle1" display="inline">
            일치하는 장소가 없습니다.
          </Typography>
          <SentimentVeryDissatisfiedIcon className={classes.noDataIcon} />
        </div>
      )}

      <Map className={classes.map} options={map}>
        {' '}
        {savePlace.latitude && savePlace.longitude && (
          <IconMarker options={{ position: [savePlace.longitude, savePlace.latitude] }} />
        )}
      </Map>
      <SaveActiveButton
        activeStep={activeStep}
        onNextClick={handleNextClick}
        onBackClick={handleBackClick}
      />
    </>
  );
}

export default PlaceSaveMapContainer;
