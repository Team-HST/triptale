import { handleActions, createAction } from 'redux-actions';
import produce from 'immer';

import { tripService } from 'lib/axios/services';

// 액션 정의
const SET_TRIPS = 'trip/SET_TRIP_LIST';

export const setTrips = createAction(SET_TRIPS);

export const setTripsAsync = (searchNm) => async (dispatch) => {
  const response = await tripService.searchTrips(searchNm);
  dispatch(setTrips(response.trips));
};

const initialize = {
  trips: [], // 여행 목록 데이터
};

export default handleActions(
  {
    [SET_TRIPS]: (state, { payload: trips }) =>
      produce(state, (draft) => {
        draft.trips = trips;
      }),
  },
  initialize
);
