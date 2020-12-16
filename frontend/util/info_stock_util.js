export const fetchInfoForStock = (symbol) => {
    return $.ajax({
        url: `https://cloud.iexapis.com/stable/stock/${symbol}/intraday-prices?token=pk_0df25c5085a9428590bbb49600f9487c&chartInterval=5`,
        method: 'GET'
    })
}

export const fetchCompanyInfo = (symbol) => {
    return $.ajax({
        url: `https://cloud.iexapis.com/stable/stock/${symbol}/company?token=pk_0df25c5085a9428590bbb49600f9487c`,
        method: 'GET'
    })
}

export const fetchInfoStockWatchlist = (symbol) => {
    return $.ajax({
        url: `https://cloud.iexapis.com/stable/stock/${symbol}/intraday-prices?token=pk_0df25c5085a9428590bbb49600f9487c&chartLast=5`,
        method: 'GET'
    })
}