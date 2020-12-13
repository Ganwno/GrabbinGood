import {connect} from 'react-redux';
import { logout} from '../../actions/session_actions';
import Portfolio from './portfolio';
import {showStocks} from '../../actions/stock_actions';
import { fetchWatchlists } from '../../actions/watchlist_actions';

const mSTP = (state) => {
    return {
        stocks: Object.values(state.entities.stocks),
        user: state.entities.users[13]
    }
}

const mDTP = (dispatch) => {
    return {
    logout: () => dispatch(logout()),
    showStocks: () => dispatch(showStocks()),
    fetchWatchlists: (user_id) => dispatch(fetchWatchlists(user_id))
    }
}

export default connect(mSTP, mDTP)(Portfolio);