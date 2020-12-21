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