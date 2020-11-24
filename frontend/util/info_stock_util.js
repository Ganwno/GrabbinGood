export const fetchInfoForStock = (symbol) => {
    return $.ajax({
        url: `"https://cloud.iexapis.com/stable/stock/${symbol}/intraday-prices?token=pk_ad1084a6b8f141fd80e5996f98df89f6"`,
        method: 'GET'
    })
}

export const fetchCompanyInfo = (symbol) => {
    return $.ajax({
        url: `"https://cloud.iexapis.com/stable/stock/${symbol}/company?token=pk_ad1084a6b8f141fd80e5996f98df89f6"`,
        method: 'GET'
    })
}