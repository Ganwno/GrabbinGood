import { USER_CHART_INFO } from '../actions/external_stock_actions'

const  userChartReducer = (state = {}, action) => {
    Object.freeze(state);
    let dupState = Object.assign({}, state);
    switch (action.type) {
        case USER_CHART_INFO:
            return Object.assign({}, state, action.output);
        default:
            return state;
    }
}

export default userChartReducer;