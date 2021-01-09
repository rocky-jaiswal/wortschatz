import { call, put, takeLatest } from 'redux-saga/effects'

import { LOAD_INITIAL_DATA } from '../redux/app/actions'

import {
  loadInitialDataFailed,
  loadInitialDataInProgress,
  loadInitialDataSuccess,
} from '../redux/app/actions'

import API from '../api'

export function* loadInitialData() {
  try {
    yield put(loadInitialDataInProgress())

    const response = yield call(API.loadInitialData)
    yield put(loadInitialDataSuccess(response.data))
  } catch (err) {
    console.error(err)
    yield put(loadInitialDataFailed())
  }
}

export default function* loadInitialDataWatcher() {
  yield takeLatest(LOAD_INITIAL_DATA, loadInitialData)
}
