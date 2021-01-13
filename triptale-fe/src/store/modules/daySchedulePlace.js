import { handleActions, createAction } from 'redux-actions';
import { tripService, dayScheduleService } from 'lib/axios/services';
import produce from 'immer';

const SET_MAP = 'daySchedulePlace/SET_MAP';
const SET_TRIP = 'daySchedulePlace/SET_TRIP';
const SET_DAY_PLACES = 'daySchedulePlace/SET_DAY_PLACES';

export const setMap = createAction(SET_MAP);
export const setTrip = createAction(SET_TRIP);
export const setDayPlaces = createAction(SET_DAY_PLACES);

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

const initialize = {
  trip: {},
  map: {
    mapId: 'tripDayPlaceMap',
    center: [33.450701, 126.570667],
    level: 8,
  },
  dayPlaces: [],
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
  },
  initialize,
);
