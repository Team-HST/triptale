import { createStore, compose, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import reduxThunk from 'redux-thunk';
import reducers from './modules';

/**
 * @description store 생성 및 module 적용
 * @description redux middleware - redux-logger (로거 미들웨어)
 * @description redux dev tools 설정
 */

const enhancer =
  process.env.NODE_ENV === 'development'
    ? composeWithDevTools(applyMiddleware(reduxThunk, createLogger()))
    : compose(applyMiddleware(reduxThunk));

const store = createStore(reducers, enhancer);

export default store;
