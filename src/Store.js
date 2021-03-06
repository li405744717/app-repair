/**
 * Created by dp-k on 2019/12/3.
 */
import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
// import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga'
import saga from './Sagas'

import userReducer from '@/pages/user/login/reducer'
import repairReducer from '@/pages/repair/list/reducer'

const reducer = combineReducers({

  user: userReducer,
  repair: repairReducer
});

const sagaMiddleWare = createSagaMiddleware()
const middleWares = [sagaMiddleWare];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const win = window;
const storeEnhancers = compose(
  applyMiddleware(...middleWares),
  // composeEnhancers
  (win && win.__REDUX_DEVTOOLS_EXTENSION__) ? win.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f,
);
const store = createStore(reducer, storeEnhancers) //storeEnhancers
// const store = createStore(reducer)

sagaMiddleWare.run(saga)
export default store

