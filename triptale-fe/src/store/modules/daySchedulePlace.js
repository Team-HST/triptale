import { handleActions, createAction } from 'redux-actions';
import produce from 'immer';

const SET_MAP = 'daySchedulePlace/SET_MAP';
const SET_TRIP = 'daySchedulePlace/SET_TRIP';

export const setMap = createAction(SET_MAP);
export const setTrip = createAction(SET_TRIP);

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
        draft.map = map;
      }),
  },
  initialize,
);
