import * as APIUtil from '../util/stock_api_util';

export const RECEIVE_STOCK = 'RECEIVE_STOCK';
export const RECEIVE_STOCKS = 'RECEIVE_STOCKS';

const receiveStock = (stock) => {
    return {
        type: RECEIVE_STOCK,
        stock: stock
    }
}

const receiveStocks = (stocks) => {
    return {
        type: RECEIVE_STOCKS,
        stocks: stocks
    }
}

export const showStock = (stock) => (dispatch) => {
    return APIUtil.showStock(stock.id)
    .then(stock => dispatch(receiveStock(stock)))
}

export const showStocks = () => (dispatch) => {
    return APIUtil.showStocks()
    .then(stocks => dispatch(receiveStocks(stocks)))
} 


