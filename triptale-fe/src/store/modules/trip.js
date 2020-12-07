import { handleActions, createAction } from 'redux-actions';
import produce from 'immer';

import { tripService } from 'lib/axios/services';

// 액션 정의
const SET_TRIP_LIST = 'trip/SET_TRIP_LIST';

export const setTripList = createAction(SET_TRIP_LIST);

export const setTripListAsync = (searchNm) => async (dispatch) => {
  const response = await tripService.searchTrips(searchNm);
  dispatch(setTripList(response.trips));
};

const initialize = {
  list: [], // 여행 목록 데이터
};

export default handleActions(
  {
    [SET_TRIP_LIST]: (state, { payload: list }) =>
      produce(state, (draft) => {
        draft.list = list;
      }),
  },
  initialize,
);
