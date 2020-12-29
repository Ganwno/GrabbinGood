import {RECEIVE_CURRENT_USER, USER_ACC_INFO} from '../actions/session_actions';

const usersReducer = (state = {}, action) => {
    Object.freeze(state);
    let dupState = Object.assign({}, state);
    switch(action.type) {
        case RECEIVE_CURRENT_USER:
        return Object.assign({}, state, {[action.currentUser.id]: action.currentUser});
        case USER_ACC_INFO:
        return Object.assign({}, state, action.info)
        default: 
        return state;
    }
};

export default usersReducer;