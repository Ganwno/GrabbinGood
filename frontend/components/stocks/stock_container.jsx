
import {connect} from 'react-redux';
import {showStocks} from '../../actions/stock_actions';
import StockDetail from './stock_detail'

const mSTP = (state, ownProps) => {
    return {
        stock: state.entities.stocks[ownProps.match.params.id]
    }
}


const mDTP = (dispatch) => {
    return {
        showStocks: () => dispatch(showStocks())
    }
}

export default connect(mSTP, mDTP)(StockDetail)