import { handleActions, createAction } from 'redux-actions';
import { tripService } from 'lib/axios/services';
import produce from 'immer';

const SET_MAP = 'daySchedulePlace/SET_MAP';
const SET_TRIP = 'daySchedulePlace/SET_TRIP';

export const setMap = createAction(SET_MAP);
export const setTrip = createAction(SET_TRIP);

// 상세 여행정보 조회
export const setTripAsync = (tripNo) => async (dispatch) => {
  const response = await tripService.searchTrip(tripNo);
  dispatch(setTrip(response));
};

const initialize = {
  trip: {},
  map: {
    mapId: 'tripDayPlaceMap',
    center: [33.450701, 126.570667],
    level: 8,
  },
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
  },
  initialize,
);
