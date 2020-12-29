export const showWatchlists = (user_id) => {
    return $.ajax({
        method: "GET",
        url: `/api/watchlists/${user_id}`
    })
}

export const createWatchlist = (watchlist, lastPrice) => {
    return $.ajax({
        method: "POST",
        url: `/api/watchlists`,
        data: {watchlist, lastPrice}
    })
}

export const updateWatchlist = (id, watchlist, lastPrice) => {
    return $.ajax({
        method: "PATCH",
        url: `/api/watchlists/${id}`,
        data: {watchlist, lastPrice}
    })
}

export const sellWatchlist = (id, watchlist, lastPrice) => {
    return $.ajax({
        method: "DELETE",
        url: `/api/watchlists/${id}`,
        data: {watchlist, lastPrice}
    })
}