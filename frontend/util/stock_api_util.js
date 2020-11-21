export const showStocks = () => {
    return $.ajax({
        method: "GET",
        url: "/api/stocks"
    })
}

export const showStock = (id) => {
    return $.ajax({
        method: "GET",
        url: `/api/stocks/${id}`
    })
}