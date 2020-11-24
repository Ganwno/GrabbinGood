import { COMPANY_INFO } from '../actions/external_stock_actions';

const currentCompanyInfo = (state = {}, action) => {
    Object.freeze(state);
    let dupState = Object.assign({}, state);
    switch (action.type) {
        case COMPANY_INFO:
            return Object.assign({}, state, action.info);
        default:
            return state;
    }
}

export default currentCompanyInfo;