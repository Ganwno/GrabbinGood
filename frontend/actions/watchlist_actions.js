import * as APIUtil from '../util/watchlist_util';
export const RECEIVE_WATCHLISTS = 'RECEIVE_WATCHLISTS';
export const CREATE_WATCHLIST = 'CREATE_WATCHLIST'
export const UPDATE_WATCHLIST = 'UPDATE_WATCHLIST'
export const SELL_WATCHLIST = 'SELL_WATCHLIST'

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

const updateWatchlists = (watchlist) => {
    return {
        type: UPDATE_WATCHLIST,
        updated: watchlist
    }
}

const sellWatchlists = (watchlist) => {
    return {
        type: SELL_WATCHLIST,
        sell: watchlist
    }
}

export const fetchWatchlists = (user_id) => (dispatch) => {
    return APIUtil.showWatchlists(user_id)
    .then(watchlists => dispatch(receiveWatchlists(watchlists)))
}

export const createWatchlist = (watchlist, lastPrice) => (dispatch) => {
    return APIUtil.createWatchlist(watchlist, lastPrice)
    .then(watchlist => dispatch(createTheWatchlists(watchlist)))
}

export const updateWatchlist = (id, watchlist, lastPrice) => (dispatch) => {
    return APIUtil.updateWatchlist(id, watchlist, lastPrice).then(watchlist => dispatch(updateWatchlists(watchlist)))
}

export const sellWatchlist = (id, watchlist, lastPrice) => (dispatch) => {
    return APIUtil.sellWatchlist(id, watchlist, lastPrice).then(watchlist => dispatch(sellWatchlists(watchlist)))
}

