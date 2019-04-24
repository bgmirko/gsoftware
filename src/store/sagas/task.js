import axios from 'axios';
import { put } from "redux-saga/effects";
import * as actions from "../actions";
import moment from 'moment';

export function* fetchAllTasksSaga(action){
    try {
        const response = yield axios({
            method: 'get',
            url: 'https://qsoftware-task.firebaseio.com/task.json',
        });

        const fetshedAllTasks = [];
        for (let key in response.data){
            fetshedAllTasks.push({
                ...response.data[key],
                selected: false,
                dateFormated: moment(response.data[key].date).format('MM/DD/YYYY'),
                time: moment(response.data[key].date).format("hh:mm:ss a"),
                dbId: key
            });
        }
        yield put(actions.fetchAllTasksSuccess(fetshedAllTasks))
    } catch (error) {
        console.log(error);
        yield put(actions.fetchAllTasksFail());
    }
}


export function* saveNewTaskSaga(action) {

    const data = {
        id: Math.floor(100000 + Math.random() * 900000),
        jobTitle: action.jobTitle,
        jobDescription: action.jobDescription,
        date: new Date()
    }

    try {
        yield axios({
            method: 'post',
            url: 'https://qsoftware-task.firebaseio.com/task.json',
            data: data
        });
        yield put(actions.fetchAllTasks());

    } catch (error) {
        console.log(error);
    }
}


export function* deleteTasksSaga(action){
 
    for(let data of action.ids){
        try {
            yield axios({
                method: 'delete',
                url: `https://qsoftware-task.firebaseio.com/task/${data}.json`
            });
        } catch (error) {
            console.log(error);
        }
    }
    yield put(actions.fetchAllTasks());
}

export function* editTaskSaga(action) {

    const data = {
        jobTitle: action.jobTitle,
        jobDescription: action.jobDescription,
        date: new Date(),
        id: action.id
    }

    try {
        yield axios.put(`https://qsoftware-task.firebaseio.com/task/${action.dbId}.json`, data);
        yield put(actions.fetchAllTasks());
    } catch (error) {
        console.log(error);
    }
}