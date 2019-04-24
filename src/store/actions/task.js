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

export const deleteTasks = (ids) => {
    return{
        type: actionTypes.DELETE_TASKS,
        ids: ids
    }
}

export const editTask = (dbId, id, jobTitle, jobDescription) => {
    return{
        type: actionTypes.EDIT_TASKS,
        dbId: dbId,
        id: id,
        jobTitle: jobTitle,
        jobDescription: jobDescription
    }
}

export const tableRowClicked = (id) => {
    return{
        type: actionTypes.TABLE_ROW_CLICKED,
        id: id
    }
}

export const modalStateChanged = () => {
    return{
        type: actionTypes.MODAL_STATE_CHANGED
    }
}