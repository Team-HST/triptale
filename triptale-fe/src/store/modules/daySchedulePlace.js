import { handleActions, createAction } from 'redux-actions';
import { tripService, dayScheduleService } from 'lib/axios/services';
import produce from 'immer';

const SET_MAP = 'daySchedulePlace/SET_MAP';
const SET_TRIP = 'daySchedulePlace/SET_TRIP';
const SET_DAY_PLACES = 'daySchedulePlace/SET_DAY_PLACES';
const SET_SAVE_PLACE = 'daySchedulePlace/SET_SAVE_PLACE';
const SET_SAVE_PLACE_DONE = 'daySchedulePlace/SET_SAVE_PLACE_DONE';
const SET_SAVE_PLACE_ERROR = 'dayShedulePlace/SET_SAvE_PLACE_ERROR';
const INIT_SAVE_PLACE = 'daySchedulePlace/INIT_SAVE_PLACE';
const SET_ACTIVE_STEP = 'daySchedulePlace/SET_ACTIVE_STEP';

export const setMap = createAction(SET_MAP);
export const setTrip = createAction(SET_TRIP);
export const setDayPlaces = createAction(SET_DAY_PLACES);
export const setSavePlace = createAction(SET_SAVE_PLACE);
export const setSavePlaceDone = createAction(SET_SAVE_PLACE_DONE);
export const setSavePlaceError = createAction(SET_SAVE_PLACE_ERROR);
export const initSavePlace = createAction(INIT_SAVE_PLACE);
export const setActiveStep = createAction(SET_ACTIVE_STEP);

// 상세 여행정보 조회
export const setTripAsync = (tripNo) => async (dispatch) => {
  const response = await tripService.searchTrip(tripNo);
  dispatch(setTrip(response));
};

// 여행 일차 별 장소 목록 조회
export const setDayPlacesAsync = (tripNo, dayScheduleNo) => async (dispatch) => {
  const response = await dayScheduleService.searchDaySchedulePlace(tripNo, dayScheduleNo);
  dispatch(setDayPlaces(response.places));
};

// 여행 일차 별 장소 등록 & 수정
export const saveDayPlaceAsync = (tripNo, dayScheduleNo, place) => async (dispatch) => {
  try {
    await dayScheduleService.createDaySchedulePlace(tripNo, dayScheduleNo, place);
    // 목록 새로고침 후 저장 데이터 삭제
    dispatch(setDayPlacesAsync(tripNo, dayScheduleNo));
    dispatch(setSavePlaceDone());
  } catch (error) {
    console.error(error.response.data);
    dispatch(setSavePlaceError(error.response.data));
  }
};

const initialize = {
  trip: {},
  map: {
    mapId: 'tripDayPlaceMap',
    center: [33.450701, 126.570667],
    level: 6,
  },
  dayPlaces: [],
  savePlace: {},
  savePlaceDone: false,
  savePlaceError: null,
  activeStep: 0,
};

export default handleActions(
  {
    [SET_MAP]: (state, { payload: map }) =>
      produce(state, (draft) => {
        draft.map = {
          ...state.map,
          ...map,
        };
      }),
    [SET_TRIP]: (state, { payload: trip }) =>
      produce(state, (draft) => {
        draft.trip = trip;
      }),
    [SET_DAY_PLACES]: (state, { payload: places }) =>
      produce(state, (draft) => {
        draft.dayPlaces = places;
      }),
    [SET_SAVE_PLACE]: (state, { payload: placeInfo }) =>
      produce(state, (draft) => {
        draft.savePlace = {
          ...state.savePlace,
          ...placeInfo,
        };
        draft.savePlaceError = null;
        draft.savePlaceDone = false;
      }),
    [SET_SAVE_PLACE_DONE]: (state) =>
      produce(state, (draft) => {
        draft.savePlaceDone = true;
        draft.savePlace = {};
        draft.savePlaceError = null;
      }),
    [SET_SAVE_PLACE_ERROR]: (state, { payload: error }) =>
      produce(state, (draft) => {
        draft.savePlaceError = error;
        draft.savePlaceDone = false;
      }),
    [INIT_SAVE_PLACE]: (state) =>
      produce(state, (draft) => {
        draft.savePlace = {};
      }),
    [SET_ACTIVE_STEP]: (state, { payload: step }) =>
      produce(state, (draft) => {
        draft.activeStep = step;
      }),
  },
  initialize,
);
