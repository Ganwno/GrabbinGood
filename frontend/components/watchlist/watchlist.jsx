import React from 'react';
import { connect } from 'react-redux';
import { fetchWatchlists } from '../../actions/watchlist_actions';
import { Link } from 'react-router-dom';

class Watchlist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stockPrice: []
        }
        this.doesUserHaveStocks = this.doesUserHaveStocks.bind(this)
        // this.mapped = this.mapped.bind(this)
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
        // console.log(Object.values(this.props.values));
        // console.log(this.props.values)
        let arrOwnStocks = []
        let arrOfStockSym = []
        this.props.watchlist.forEach(watchlist => {
            let stockSym = watchlist.stock_symbol.toLowerCase();
            arrOfStockSym.push(stockSym)
            let url = `https://cloud.iexapis.com/stable/stock/${stockSym}/intraday-prices?token=pk_0df25c5085a9428590bbb49600f9487c&chartInterval=5`
            let promise = fetch(url).then(response => response.json())
            arrOwnStocks.push(promise)
            
        })  
        Promise.all(arrOwnStocks).then(arrOfObj => {
        let newArr = []
        let arrFirstPrice = []
            arrOfObj.forEach(arr => {
                let i;
                for (i = arr.length - 1; i > 0; i--) {
                    if (arr[i].high) {
                        newArr.push(arr[i].high)
                        break;
                    }
                }
                let j;
                for (j = 0; j < arr.length-1; j++) {
                    if (arr[j].high) {
                        arrFirstPrice.push(arr[j].high)
                        break;
                    }
                }
            })
            let k;
            let percentChangeArr = [];
            for (k = 0; k < newArr.length; k++) {
                let difference = newArr[k] - arrFirstPrice[k]
                let percentChange = (difference / arrFirstPrice[k]) * 100
                if (percentChange < 0) {
                    percentChangeArr.push(`${percentChange.toFixed(2)}%`)
                }
                else {
                    percentChangeArr.push(`+ ${percentChange.toFixed(2)}%`) 
                }
            }
                console.log(newArr)
                console.log(percentChangeArr)

            this.setState({
                stockPrice: newArr,
                percentChange: percentChangeArr
            })
        })
    }



    render(){
        if (this.state.stockPrice < 1) {
            return null;
        }
        else {
        return(
            <div>
                <div>
                Stocks
                </div>
                {this.doesUserHaveStocks() ? 
                   <div>
                       hi
                    </div>
                : <div>User Has No Stocks!</div>
                }
                <div>
                    Lists
                </div>
            </div>
        )
            }
    }
}


const mSTP = (state) => {
    return {
        watchlist: Object.values(state.entities.watchlist),
        values: state.entities.stocks

    }

}

const mDTP = (dispatch) => {
    return {
        fetchWatchlists: (user_id) => dispatch(fetchWatchlists(user_id))
    }
}

export default connect(mSTP, mDTP)(Watchlist);