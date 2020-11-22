
import {connect} from 'react-redux';
import React from 'react'
import {showStock} from '../../actions/stock_actions'
import StockDetail from './stock_detail';

const mSTP = (state, ownProps) => {
    return {
        stock: "hi"
    }
}

//state.entities.stocks[ownProps.match.params.stockId]

const mDTP = (dispatch) => {
    return {
        showStock: (stock) => dispatch(showStock(stock))
    }
}

export default connect(mSTP, mDTP)(StockDetail);