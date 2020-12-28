
import {connect} from 'react-redux';
import {showStocks} from '../../actions/stock_actions';
import StockDetail from './stock_detail'
import {logout} from '../../actions/session_actions';
import {updateCurrentCompanyNews, updateCurrentFinanceInfo} from '../../actions/external_stock_actions'


const mSTP = (state, ownProps) => {
    return {
        stock: state.entities.stocks[ownProps.match.params.id],
        user: state.session.id,
        accBal: parseFloat(Object.values(state.entities.users)[0].account_balance).toFixed(2)
    }
}


const mDTP = (dispatch) => {
    return {
        showStocks: () => dispatch(showStocks()),
        logout: () => dispatch(logout()),
        updateCurrentFinanceInfo: (sym) => dispatch(updateCurrentFinanceInfo(sym)),
        updateCurrentCompanyNews: (sym) => dispatch(updateCurrentCompanyNews(sym))
    }
}

export default connect(mSTP, mDTP)(StockDetail)