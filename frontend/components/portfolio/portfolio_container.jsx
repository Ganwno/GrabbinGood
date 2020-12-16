import {connect} from 'react-redux';
import { logout} from '../../actions/session_actions';
import Portfolio from './portfolio';
import {showStocks} from '../../actions/stock_actions';
import { fetchWatchlists } from '../../actions/watchlist_actions';
import { updateUserChart } from '../../actions/external_stock_actions';

const mSTP = (state) => {
    return {
        stocks: Object.values(state.entities.stocks),
        user: state.session.id,
        arrOfUsersStocks: Object.values(state.entities.watchlist)
    }
}

const mDTP = (dispatch) => {
    return {
    logout: () => dispatch(logout()),
    showStocks: () => dispatch(showStocks()),
    fetchWatchlists: (user_id) => dispatch(fetchWatchlists(user_id)),
    updateUserChart: (ownStocks) => dispatch(updateUserChart(ownStocks))
    }
}

export default connect(mSTP, mDTP)(Portfolio);