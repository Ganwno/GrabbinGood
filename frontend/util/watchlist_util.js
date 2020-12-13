export const showWatchlists = (user_id) => {
    return $.ajax({
        method: "GET",
        url: `/api/users/${user_id}`
    })
}