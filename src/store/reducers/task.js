import * as actionTypes from '../actions/actionTypes';


const initialState = {
    tasks : []
}

const fetchAllTasksSuccess = ( state, action ) => {
    return {
        ...state,
        tasks: action.tasks
    }

}

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.FETCH_ALL_TASKS_SUCCESS: return fetchAllTasksSuccess( state, action );
        default: return state;
    }
}


export default reducer;