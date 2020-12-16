import {COMPANY_NEWS} from '../actions/external_stock_actions'

const currentCompanyNews = (state = {}, action) => {
    Object.freeze(state);
    let dupState = Object.assign({}, state);
    switch (action.type) {
        case COMPANY_NEWS:
            return Object.assign({}, state, action.news);
        default:
            return state;
    }
}

export default currentCompanyNews;