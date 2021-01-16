import React from 'react';
import { connect } from 'react-redux';
import { fetchWatchlists } from '../../actions/watchlist_actions';
import { Link } from 'react-router-dom';
import './watchlist_style.css'

class Watchlist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stockPriceOfBoughtStocks: [],
            percentChangeOfBought: [],
            numShares: [],
            stockPriceOfWatchedStocks: [],
            percentChangeOfWatched: [],
            listOfBought: [],
            listOfWatched: [],
            placeholder: '',
            arrOfObj: ''
        }
        this.doesUserHaveStocks = this.doesUserHaveStocks.bind(this)
        this.color = this.color.bind(this)
        this.colorOfBought = this.colorOfBought.bind(this)
    }

    doesUserHaveStocks() {
        if (this.props.watchlist.length < 1) {
            return false
        }
        else {
            return true
        }
    }

    colorOfBought(idx){

        if (parseFloat(this.state.percentChangeOfBought[idx]) > 0) {
            return '#3BD53F'
        }
        else {
            return '#FF6017'
        }
    }

    color(idx) {
        if (parseFloat(this.state.percentChangeOfWatched[idx]) > 0) {
            return '#3BD53F'
        }
        else {
            return '#FF6017'
        }
    }



    componentDidMount() {
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
                    percentChangeArr.push(`+${percentChange.toFixed(2)}%`) 
                }
            }
            let listOfBought = []
            let listOfWatched = []
            let boughtStockPrice = []
            let boughtPercentChange = []
            let watchedStockPrice = []
            let watchedPercentChange = []
            let numOfShares = []
            this.props.watchlist.forEach((watchlist, idx) => {
                if (watchlist.num_stocks !== 0) {
                    boughtStockPrice.push(newArr[idx].toFixed(2))
                    boughtPercentChange.push(percentChangeArr[idx])
                    listOfBought.push(watchlist)
                    numOfShares.push(watchlist.num_stocks)
                }
                else {
                    watchedStockPrice.push(newArr[idx].toFixed(2))
                    watchedPercentChange.push(percentChangeArr[idx])
                    listOfWatched.push(watchlist)

                }
            })

            this.setState({
                stockPriceOfBoughtStocks: boughtStockPrice,
                percentChangeOfBought: boughtPercentChange,
                stockPriceOfWatchedStocks: watchedStockPrice,
                percentChangeOfWatched: watchedPercentChange,
                listOfBought: listOfBought,
                listOfWatched: listOfWatched,
                numShares: numOfShares,
                placeholder: 'placeholder',
                arrOfObj: arrOfObj.length
            })
        })
    }

   



    render(){
    
        if (this.props.watchlist.length !== this.state.arrOfObj) {
            return null
        }
        else {
        return(
            <div className="watchlist-whole-stocks">
                <div className="watchlist-stock-title">
                Stocks
                </div>
                {this.doesUserHaveStocks() ? 
                   this.state.listOfBought.map((watchlist, idx) => (
                       <Link to={`/stocks/${watchlist.stock_id}`} key={idx} className="watchlist-owned-link">
                        <div className="watchlist-indiv-owned-stock">
                            <div className= "watchlist-stocksymprice">
                            <div className="watchlist-indiv-stocksymbol">
                            {watchlist.stock_symbol}
                            </div>
                            <div>
                            ${this.state.stockPriceOfBoughtStocks[idx]}
                            </div>
                            </div>
                            <div className= "watchlist-numsharepercent">
                            <div>
                           {this.state.numShares[idx]} shares
                           </div>
                           <div style={{color: this.colorOfBought(idx)}}>
                            {this.state.percentChangeOfBought[idx]}
                            </div>
                            </div>
                        </div>
                       </Link>
                   ))
                : <div>User Has No Stocks!</div>
                }
                <div>
                    <div className="watchlist-list-title">
                    Lists
                    </div>
                    {this.doesUserHaveStocks() ?
                    this.state.listOfWatched.map((watchlist, idx) => (
                        <Link to={`/stocks/${watchlist.stock_id}`} key={idx} className="watchlist-list-link">
                        <div className="watchlist-list-everything">
                            <div className="watchlist-list-symprice">
                            <div className="watchlist-list-indiv-stocksymbol">
                            {watchlist.stock_symbol}
                            </div>
                            <div>
                            ${this.state.stockPriceOfWatchedStocks[idx]}
                            </div>
                            </div>
                            <div className="watchlist-list-percentchange" style={{color: this.color(idx)}}>
                            {this.state.percentChangeOfWatched[idx]}
                            </div>
                        </div>
                        </Link>
                    ))
                    
                : <div>Add to the Watchlist!</div>    
                }
                </div>
            </div>
        )
            }
    }
}


const mSTP = (state) => {
    return {
        values: state.entities.stocks

    }

}

const mDTP = (dispatch) => {
    return {
        fetchWatchlists: (user_id) => dispatch(fetchWatchlists(user_id))
    }
}

export default connect(mSTP, mDTP)(Watchlist);