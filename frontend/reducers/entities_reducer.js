import {combineReducers} from 'redux';
import usersReducer from './users_reducer';
import stocksReducer from './stocks_reducer';
import currentAssetReducer from './current_asset_reducer'
import watchlistReducer from './watchlist_reducer'

const entitiesReducer = combineReducers({
    users: usersReducer,
    stocks: stocksReducer,
    currentAsset: currentAssetReducer,
    watchlist: watchlistReducer
});

export default entitiesReducer;