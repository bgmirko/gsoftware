import { takeEvery, all } from "redux-saga/effects";
import * as actionTypes from "../actions/actionTypes";

import {
    saveNewTaskSaga,
    fetchAllTasksSaga,
    deleteTasksSaga
} from './task';

export function* watchTask() {
    yield all([
        takeEvery(actionTypes.SAVE_NEW_TASK, saveNewTaskSaga),
        takeEvery(actionTypes.FETCH_ALL_TASKS, fetchAllTasksSaga),
        takeEvery(actionTypes.DELETE_TASKS, deleteTasksSaga)
    ]);
}