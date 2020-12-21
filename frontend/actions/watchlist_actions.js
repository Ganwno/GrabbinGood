import * as APIUtil from '../util/watchlist_util';
export const RECEIVE_WATCHLISTS = 'RECEIVE_WATCHLISTS';
export const CREATE_WATCHLIST = 'CREATE_WATCHLIST'

const receiveWatchlists = (watchlists) => {
    return {
        type: RECEIVE_WATCHLISTS,
        watchlists: watchlists
    }
}

const createTheWatchlists = (watchlist) => {
    return {
        type: CREATE_WATCHLIST,
        watchlist: watchlist
    }
}

export const fetchWatchlists = (user_id) => (dispatch) => {
    return APIUtil.showWatchlists(user_id)
    .then(watchlists => dispatch(receiveWatchlists(watchlists)))
}

export const createWatchlist = (watchlist) => (dispatch) => {
    return APIUtil.createWatchlist(watchlist)
    .then(watchlist => dispatch(createTheWatchlists(watchlist)))
}

