import { combineReducers } from 'redux';

import test from './test';
import trip from './trip';
import daySchedule from './daySchedule';
import daySchedulePlace from './daySchedulePlace';

export default combineReducers({
  test,
  trip,
  daySchedule,
  daySchedulePlace,
});
