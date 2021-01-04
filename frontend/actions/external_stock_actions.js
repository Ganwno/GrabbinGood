import * as APIUtil from '../util/info_stock_util';

export const CURRENT_ASSET = 'CURRENT_ASSET';
export const COMPANY_INFO = 'COMPANY_INFO';
export const COMPANY_NEWS = 'COMPANY_NEWS';
export const USER_CHART_INFO = 'USER_CHART_INFO';

const receiveCurrentAssetInfo = (asset) => {
    return {
        type: 'CURRENT_ASSET',
        currentAsset: asset
    }
}

const receiveCompanyInfo = (asset) => {
    return {
        type: 'COMPANY_INFO',
        generalInfo: asset
    }
}

const receiveCompanyNews = (news) => {
    return {
        type: 'COMPANY_NEWS',
        news: news
    }
}

const receiveUserData = (output) => {
    return {
        type: 'USER_CHART_INFO',
        output: output
    }
}

export const updateCurrentFinanceInfo = (symbol) => dispatch => {
    return APIUtil.fetchInfoForStock(symbol)
    .then(info => dispatch(receiveCurrentAssetInfo(info)))
}

export const updateCurrentCompanyInfo = (symbol) => dispatch => {
    return APIUtil.fetchCompanyInfo(symbol)
    .then(info => dispatch(receiveCompanyInfo(info)))
}   

export const updateCurrentCompanyNews = (symbol) => dispatch => {
    return APIUtil.fetchCompanyNews(symbol)
    .then(news => dispatch(receiveCompanyNews(news)))
}

export const updateUserChart = (ownStocks, newAccBal) => dispatch => {
    let arr2 = [];
    ownStocks.forEach((stock) => {
        if (stock.num_stocks !== 0) {
        let stockSym = stock.stock_symbol;
        const promise = APIUtil.fetchInfoForStock(stockSym)
        arr2.push(promise)
        }
    })
    return Promise.all(arr2).then((arr) => {
        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        let arrOfStockSym = ownStocks
        let i;
        let j;
        let newArrOfStockSym = arrOfStockSym.filter((watchlist) => {
            return watchlist.num_stocks !== 0
        })
        for (i = 0; i < arr.length; i++) {
            arr[i].forEach((obj, idx) => {
                //for loop fixes null values
                if (obj.high === null) {
                    for (j = idx; j >= 0; j--) {
                        if (arr[i][j].high !== null) {
                            obj.high = arr[i][j].high
                            break;
                        }
                    }
                }
                else {
                obj.high = obj.high * newArrOfStockSym[i].num_stocks
                }
            })
        }
        let output = [];
        let flattened = arr.flat();

        flattened.forEach(function (item) {
            var existing = output.filter(function (v, i) {
                return v.label == item.label;
            });
            if (existing.length) {
                var existingIndex = output.indexOf(existing[0]);
                output[existingIndex].high = output[existingIndex].high.concat(item.high)
            } 
            else {
                if (typeof item.high == 'number')
                    item.high = [item.high];
                output.push(item);
            }
        });
         output.forEach((obj) => {
            obj.high = obj.high.concat(newAccBal)
        })
       
        output.forEach((obj) => {
            obj.high = obj.high.reduce(reducer)
        })
        return dispatch(receiveUserData(output))
    })
}