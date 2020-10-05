import { createStore, compose, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { createLogger } from 'redux-logger';
import modules from './modules';

/**
 * @description store 생성 및 module 적용
 * @description redux middleware - redux-logger (로거 미들웨어)
 * @description redux dev tools 설정
 */
const store = createStore(modules, compose(applyMiddleware(createLogger()), composeWithDevTools()));

export default store;