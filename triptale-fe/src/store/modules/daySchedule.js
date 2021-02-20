import { handleActions, createAction } from 'redux-actions';
import produce from 'immer';
import { tripService, dayScheduleService } from 'lib/axios/services';

const SET_TRIP = 'daySchedule/SET_TRIP';
const SET_DAY_SCHEDULES = 'daySchedule/SET_DAY_SCHEDULES';
const SET_MAP = 'daySchedule/SET_MAP';

export const setTrip = createAction(SET_TRIP);
export const setDaySchedules = createAction(SET_DAY_SCHEDULES);
export const setMap = createAction(SET_MAP);

// 상세 여행정보 조회
export const setTripAsync = (tripNo) => async (dispatch) => {
  const response = await tripService.searchTrip(tripNo);
  dispatch(setTrip(response));
};

// 여행 일자 목록 조회
export const setDaySchedulesAsync = (tripNo) => async (dispatch) => {
  try {
    const response = await dayScheduleService.searchDaySchedules(tripNo);
    dispatch(setDaySchedules(response.daySchedules));
  } catch (error) {
    console.error(error);
  }
};

const initialize = {
  trip: {},
  daySchedules: [],
  map: {
    mapId: 'tripDayMap',
    center: [33.450701, 126.570667],
    level: 8,
  },
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
    [SET_MAP]: (state, { payload: map }) =>
      produce(state, (draft) => {
        draft.map = map;
      }),
  },
  initialize
);
