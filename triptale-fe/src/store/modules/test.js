import { handleActions, createAction } from 'redux-actions';
import produce from 'immer';

// 액션 정의
const SET_NUMBER = 'test/SET_NUMBER';

// 액션 함수 정의
export const setNumber = createAction(SET_NUMBER);

// thunk 미들웨어 사용 비동기 dispatch 처리
export const setNumberAsync = (num) => (dispatch) => {
  setTimeout(() => dispatch(setNumber(num)), 1000);
};

// 데이터 초기화
const initialize = {
  num: 1,
};

// 리듀서 정의
export default handleActions(
  {
    [SET_NUMBER]: (state, { payload: num }) =>
      produce(state, (draft) => {
        draft.num = num;
      }),
  },
  initialize,
);
