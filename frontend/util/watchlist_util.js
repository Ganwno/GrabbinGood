export const showWatchlists = (user_id) => {
    return $.ajax({
        method: "GET",
        url: `/api/users/${user_id}`
    })
}

export const createWatchlist = (watchlist) => {
    return $.ajax({
        method: "POST",
        url: `/api/watchlists`,
        data: {watchlist}
    })
}

export const updateWatchlist = (id, watchlist) => {
    return $.ajax({
        method: "PATCH",
        url: `/api/watchlists/${id}`,
        data: {watchlist}
    })
}