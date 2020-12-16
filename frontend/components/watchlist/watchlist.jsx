import React from 'react';
import { connect } from 'react-redux';
import { fetchWatchlists } from '../../actions/watchlist_actions';

class Watchlist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stockPrice: []
        }
        this.doesUserHaveStocks = this.doesUserHaveStocks.bind(this)
    }

    doesUserHaveStocks() {
        if (this.props.watchlist.length < 1) {
            return false
        }
        else {
            return true
        }
    }



    componentDidMount() {
        let arr = []
        let arrOfStockSym = []
        this.props.watchlist.forEach(watchlist => {
            let stockSym = watchlist.stock_symbol.toLowerCase();
            arrOfStockSym.push(stockSym)
            let url = `https://cloud.iexapis.com/stable/stock/${stockSym}/intraday-prices?token=pk_0df25c5085a9428590bbb49600f9487c&chartLast=5`
            let promise = fetch(url).then(response => response.json())
            arr.push(promise)
        })  
        Promise.all(arr).then(arrOfObj => {
        let newArr = []
            arrOfObj.forEach(arr => {
                let i;
                for (i = arr.length - 1; i > 0; i--) {
                    if (arr[i].high) {
                        newArr.push(arr[i].high)
                        break;
                    }
                }
            })
            this.setState({
                stockPrice: newArr
            })
        })
    }

    mapped() {
        let i;
        this.props.watchlist.map((watchlist, idx) => (
            <div>
                {watchlist.stock_symbol} {this.state.stockPrice[idx]}
            </div>
        ))
    }



    render(){
        console.log(this.state.stockPrice);
        if (this.state.stockPrice < 1) {
            return null;
        }
        return(
            <div>
                <div>
                Stocks
                </div>
                {this.doesUserHaveStocks() ? 
                    this.props.watchlist.map((watchlist, idx) => (
                        <div key = {idx}>
                            {watchlist.stock_symbol}
                            {this.state.stockPrice[idx]}
                        </div>
                    ))
                : <div>User Has No Stocks!</div>
                }
            </div>
        )
    }
}


const mSTP = (state) => {
    return {
        watchlist: Object.values(state.entities.watchlist)
    }

}

const mDTP = (dispatch) => {
    return {
        fetchWatchlists: (user_id) => dispatch(fetchWatchlists(user_id))
    }
}

export default connect(mSTP, mDTP)(Watchlist);