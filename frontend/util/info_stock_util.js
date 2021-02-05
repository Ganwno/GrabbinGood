
export const fetchInfoForStock = (symbol) => {
    return $.ajax({
        url: `https://cloud.iexapis.com/stable/stock/${symbol}/intraday-prices?token=${window.iexAPIKey}&chartInterval=5`,
        method: 'GET'
    })
}

export const fetchCompanyInfo = (symbol) => {
    return $.ajax({
        url: `https://cloud.iexapis.com/stable/stock/${symbol}/company?token=${window.iexAPIKey}`,
        method: 'GET'
    })
}

export const fetchInfoStockWatchlist = (symbol) => {
    return $.ajax({
        url: `https://cloud.iexapis.com/stable/stock/${symbol}/intraday-prices?token=${window.iexAPIKey}&chartLast=5`,
        method: 'GET'
    })
}

export const fetchCompanyNews = (symbol) => {
    return $.ajax({
        url: `https://cloud.iexapis.com/stable/stock/${symbol}/news/last/6?token=${window.iexAPIKey}`,
        method: 'GET'
    })
}