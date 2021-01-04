import {connect} from 'react-redux';
import { fetchUserAccBal, logout} from '../../actions/session_actions';
import Portfolio from './portfolio';
import {showStocks} from '../../actions/stock_actions';
import { fetchWatchlists } from '../../actions/watchlist_actions';
import { updateUserChart } from '../../actions/external_stock_actions';

const mSTP = (state) => {
    
    return {
        stocks: Object.values(state.entities.stocks),
        user: state.session.id,
        arrOfUsersStocks: Object.values(state.entities.watchlist),
        accBal: state.entities.users.account_balance,
        username: state.entities.users.username
    }
}

const mDTP = (dispatch) => {
    return {
    logout: () => dispatch(logout()),
    showStocks: () => dispatch(showStocks()),
    fetchWatchlists: (user_id) => dispatch(fetchWatchlists(user_id)),
    updateUserChart: (ownStocks, newAccBal) => dispatch(updateUserChart(ownStocks, newAccBal)),
    fetchUserAccBal: (user_id) => dispatch(fetchUserAccBal(user_id))
    }
}

export default connect(mSTP, mDTP)(Portfolio);