import { takeEvery, all } from "redux-saga/effects";
import * as actionTypes from "../actions/actionTypes";

import {
    saveNewTaskSaga,
    fetchAllTasksSaga
} from './task';

export function* watchTask() {
    yield all([
        takeEvery(actionTypes.SAVE_NEW_TASK, saveNewTaskSaga),
        takeEvery(actionTypes.FETCH_ALL_TASKS, fetchAllTasksSaga)
    //   takeEvery(actionTypes.AUTH_USER, authUserSaga),
    //   takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga)
    ]);
  }