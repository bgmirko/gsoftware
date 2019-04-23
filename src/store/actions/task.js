import * as actionTypes from './actionTypes';

export const saveNewTask = (jobTitle, jobDescription) => {
    return {
        type: actionTypes.SAVE_NEW_TASK,
        jobTitle: jobTitle,
        jobDescription: jobDescription
    }
};

export const fetchAllTasks = () => {
    return {
        type: actionTypes.FETCH_ALL_TASKS
    }
};

export const fetchAllTasksSuccess = (tasks) => {
    return {
        type: actionTypes.FETCH_ALL_TASKS_SUCCESS,
        tasks: tasks
    }
}

export const fetchAllTasksFail = () => {
    return {
        type: actionTypes.FETCH_ALL_TASKS_FAIL
    }
}