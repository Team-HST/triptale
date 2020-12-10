import { handleActions, createAction } from 'redux-actions';
import produce from 'immer';
import { tripService, dayScheduleService } from 'lib/axios/services';

const SET_TRIP = 'daySchedule/SET_TRIP';
const SET_DAY_SCHEDULES = 'daySchedule/SET_DAY_SCHEDULES';

export const setTrip = createAction(SET_TRIP);
export const setDaySchedules = createAction(SET_DAY_SCHEDULES);

// 상세 여행정보 조회
export const setTripAsync = (tripNo) => async (dispatch) => {
  const response = await tripService.searchTrip(tripNo);
  dispatch(setTrip(response));
};

// 여행 일자 목록 조회
export const setDaySchedulesAsync = (tripNo) => async (dispatch) => {
  const response = await dayScheduleService.searchDaySchedules(tripNo);
  dispatch(setDaySchedules(response.daySchedules));
};

const initialize = {
  trip: {},
  daySchedules: [],
};

export default handleActions(
  {
    [SET_TRIP]: (state, { payload: trip }) =>
      produce(state, (draft) => {
        draft.trip = trip;
      }),
    [SET_DAY_SCHEDULES]: (state, { payload: daySchedules }) =>
      produce(state, (draft) => {
        draft.daySchedules = daySchedules;
      }),
  },
  initialize,
);
