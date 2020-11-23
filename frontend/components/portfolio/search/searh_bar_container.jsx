import { connect } from 'react-redux';
import { logout } from '../../../actions/session_actions'
import SearchBar from './search_bar';
import { showStocks } from '../../../actions/stock_actions'

const mSTP = (state) => {
    return {
        stocks: Object.values(state.entities.stocks)
    }
}

const mDTP = (dispatch) => {
    return {
        logout: () => dispatch(logout()),
        showStocks: () => dispatch(showStocks())
    }
}

export default connect(mSTP, mDTP)(SearchBar);