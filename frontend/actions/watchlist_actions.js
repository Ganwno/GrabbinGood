import * as APIUtil from '../util/watchlist_util';
export const RECEIVE_WATCHLISTS = 'RECEIVE_WATCHLISTS';

const receiveWatchlists = (watchlists) => {
    return {
        type: RECEIVE_WATCHLISTS,
        watchlists: watchlists
    }
}

export const fetchWatchlists = (user_id) => (dispatch) => {
    return APIUtil.showWatchlists(user_id)
    .then(watchlists => dispatch(receiveWatchlists(watchlists)))
}

