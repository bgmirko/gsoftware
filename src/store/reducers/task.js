import * as actionTypes from '../actions/actionTypes';


const initialState = {
    tasks: [],
    modalOpen: false
}

const fetchAllTasksSuccess = (state, action) => {
    return {
        ...state,
        tasks: action.tasks
    }
}

const updateTasksData = (state, action) => {
    const tasks = state.tasks.map(el => {
        if (el.id.toString() === action.id) {
            el.selected = !el.selected;
            return el;
        } else {
            return el
        }
    })
    return {
        ...state,
        tasks: tasks
    }
}

const modalState = (state) => {
    return {
        ...state,
        modalOpen: !state.modalOpen
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_ALL_TASKS_SUCCESS: return fetchAllTasksSuccess(state, action);
        case actionTypes.TABLE_ROW_CLICKED: return updateTasksData(state, action);
        case actionTypes.MODAL_STATE_CHANGED: return modalState(state);
        default: return state;
    }
}


export default reducer;