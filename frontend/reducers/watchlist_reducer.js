import {RECEIVE_WATCHLISTS} from '../actions/watchlist_actions';

const watchlistReducer = (state = {}, action) => {
    Object.freeze(state);
    let dupState = Object.assign({}, state);
    switch(action.type) {
        case RECEIVE_WATCHLISTS:
            return Object.assign({}, state, action.watchlists)
        default:
            return state;
    }
}

export default watchlistReducer;