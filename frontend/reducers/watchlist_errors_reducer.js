import {RECEIVE_WATCHLIST_ERRORS, CREATE_WATCHLIST, UPDATE_WATCHLIST, SELL_WATCHLIST} from '../actions/watchlist_actions'

const watchlistErrorsReducer = (state = [], action) => {
    Object.freeze(state);
    switch(action.type) {
    case RECEIVE_WATCHLIST_ERRORS:
        return Object.assign([], state, action.errors)
    case CREATE_WATCHLIST:
        return [];
    case UPDATE_WATCHLIST:
        return [];
    case SELL_WATCHLIST:
        return [];
        default:
            return state;
    }
}

export default watchlistErrorsReducer;