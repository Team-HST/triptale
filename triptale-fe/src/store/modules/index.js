import { combineReducers } from 'redux';

import trip from './trip';
import daySchedule from './daySchedule';
import daySchedulePlace from './daySchedulePlace';

export default combineReducers({
  trip,
  daySchedule,
  daySchedulePlace,
});
