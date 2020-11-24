import * as APIUtil from '../util/info_stock_util';

export const CURRENT_ASSET = 'CURRENT_ASSET';
export const COMPANY_INFO = 'COMPANY_INFO';

const receiveCurrentAssetInfo = (asset) => {
    return {
        type: 'CURRENT_ASSET',
        currentAsset: asset
    }
}

const receiveCompanyInfo = (asset) => {
    return {
        type: 'COMPANY_INFO',
        info: asset
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