import {call, put, all, takeEvery, select, fork, take, takeLatest, cancel, delay} from 'redux-saga/effects'


export function* watchAndLog() {
  yield takeEvery('*', function* logger(action) {
    const state = yield select()
    // console.log('state after', action)
  })
}

export function* helloSaga() {
  console.log('Hello Sagas!');
}


export default function* rootSage() {
  yield all([

    watchAndLog(),
  ])
}