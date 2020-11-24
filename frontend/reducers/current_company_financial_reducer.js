import {CURRENT_ASSET} from '../actions/external_stock_actions'

const currentCompanyFinancial = (state = {}, action) => {
    Object.freeze(state);
    let dupState = Object.assign({}, state);
    switch (action.type) {
        case CURRENT_ASSET:
            return Object.assign({}, state, action.asset);
            default:
                return state;
    }
}

export default currentCompanyFinancial;