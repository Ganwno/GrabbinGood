import React from 'react';
import { connect } from 'react-redux';
import {createWatchlist, fetchWatchlists, updateWatchlist, sellWatchlist} from '../../../actions/watchlist_actions'

class BuySellWatch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            watchlistinfo: {
            stock_id: this.props.stock.id,
            user_id: this.props.user,
            num_stocks: 0
            },

            numOfShares: 0,
            lastPrice: 0,
            watchlist: [],
            buyingPowerNumShare: `$${this.props.accBal} Buying Power Available`,
            buttonLabel: 'Review Order',
            accBal: this.props.accBal


        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.switchToSell = this.switchToSell.bind(this)
        this.switchToBuy = this.switchToBuy.bind(this)
        this.addToList = this.addToList.bind(this)
        this.removeFromList = this.removeFromList.bind(this)
    }

    componentDidMount() {
        this.props.fetchWatchlists(this.props.user).then((watchlists) => {
            this.setState({
                lastPrice: this.props.lastPrice,
                watchlist: Object.values(watchlists.watchlists)
            })
        })
        //have to switch thunk action depending on whether or not the watchlist is in the database. If user
        //already has stock then you want to update.

    }

    update(field) {
        return e => this.setState({
            watchlistinfo: { ...this.state.watchlistinfo,
            [field]: e.currentTarget.value }
        })
    }

    handleSubmit(e) {
        //need a coditional here if user has watchlist then update if not then buy
        //this is for buy

        // console.log(this.state.buyingPowerNumShare)
        e.preventDefault();
        if (this.state.buttonLabel === "Review Order") {
            const watchlist = Object.assign({}, this.state.watchlistinfo)
            let count = 0;
            this.state.watchlist.forEach((obj) => {
                if ((this.props.stock.stock_symbol === obj.stock_symbol)) {
                count += 1;
                }
            })
            // console.log(this.state.watchlist)
            // console.log(this.props.stock)
            // console.log(count)
            if (count === 1) {
                this.props.updateWatchlist(this.props.stock.id, watchlist, this.props.lastPrice)
                let difference = this.props.lastPrice * this.state.watchlistinfo.num_stocks
                let newAccountBal = (this.state.accBal - difference).toFixed(2)
                if (newAccountBal < 0){
                    newAccountBal = this.state.accBal
                }
                this.setState({
                    accBal: newAccountBal,
                    buyingPowerNumShare: `$${newAccountBal} Buying Power Available`
                })
            }
            else {
                 //need to fix so it only creates watchlist once then updates
                let difference = this.props.lastPrice * this.state.watchlistinfo.num_stocks
                let newAccountBal = (this.state.accBal - difference).toFixed(2)
                if (newAccountBal < 0) {
                    newAccountBal = this.state.accBal
                }
                this.props.createWatchlist(watchlist, this.props.lastPrice).then(() =>{
                    this.props.fetchWatchlists(this.props.user).then((watchlists) => {
                        this.setState({
                            watchlist: Object.values(watchlists.watchlists),
                            accBal: newAccountBal,
                            buyingPowerNumShare: `$${newAccountBal} Buying Power Available`
                        })
                    })
                })
            }

        }
        else {
            const watchlist = Object.assign({}, this.state.watchlistinfo)
            this.props.sellWatchlist(this.props.stock.id, watchlist, this.props.lastPrice)
            let newNumOfShares = this.state.numOfShares - this.state.watchlistinfo.num_stocks
            if (newNumOfShares < 0) {
                newNumOfShares = this.state.numOfShares
            }
            this.setState({
                numOfShares: newNumOfShares,
                buyingPowerNumShare: `${newNumOfShares} Shares Available`
            })
        
        }
        
    }

    switchToSell(){
        let i;
        for (i = 0; i < this.state.watchlist.length; i++) {
            if (this.props.stock.stock_symbol === this.state.watchlist[i].stock_symbol) {
                this.setState({
                    buyingPowerNumShare: `${this.state.watchlist[i].num_stocks} Shares Available`,
                    buttonLabel: 'Review Sell Order',
                    numOfShares: this.state.watchlist[i].num_stocks
                })
                break;
            }
        }
    }

    switchToBuy(){
        this.setState({
            buyingPowerNumShare: `$${this.props.accBal} Buying Power Available`,
            buttonLabel: 'Review Order'
        })
    }

    addToList(){
        let watchlist = Object.assign({}, {stock_id: this.props.stock.id, user_id: this.props.user, num_stocks: 0})
        this.props.createWatchlist(watchlist).then(() => {
            this.props.fetchWatchlists(this.props.user).then((watchlists) => {
                this.setState({
                    watchlist: Object.values(watchlists.watchlists)
                })
            })
        })
    }

    removeFromList(){
        let watchlist = Object.assign({}, this.state.watchlistinfo)
        this.props.sellWatchlist(this.props.stock.id, watchlist).then(() => {
            this.props.fetchWatchlists(this.props.user).then((watchlists) => {
                this.setState({
                    watchlist: Object.values(watchlists.watchlists)
                })
            })
        })
    }


    renderErrors() {
        return (
            <ul className="errors">
                {this.props.errors.map((error, idx) => (
                    <li key={idx}>
                        {error}
                    </li>
                ))}
            </ul>
        )
    }


render() {
    if (this.state.lastPrice === 0) {
        return null
    }
    else {
        let canSell;
        // console.log(this.props.stock)
        // console.log(this.state.watchlist)
        let i;
        let j;
        let k;
        let watch = true;
        let addtoit = true;
        for (i = 0; i < this.state.watchlist.length; i++) {
            if (this.props.stock.stock_symbol === this.state.watchlist[i].stock_symbol && this.state.watchlist[i].num_stocks > 0) {
                canSell = true;
                break;
            }
            else {
                canSell = false;
            }
        }
        for (j = 0; j < this.state.watchlist.length; j++) {
            if (this.props.stock.stock_symbol === this.state.watchlist[j].stock_symbol && this.state.watchlist[j].num_stocks === 0) {
                watch = false;
                break;
            }
        }

        for (k = 0; k < this.state.watchlist.length; k++) {
            if (this.props.stock.stock_symbol === this.state.watchlist[k].stock_symbol) {
                addtoit = false;
                break;
            }
        }

    return(
        <div>
            <div onClick={this.switchToBuy}>
            Buy {this.props.stock.stock_symbol}
            </div>
            {canSell ?
                <div onClick={this.switchToSell}>
                    Sell {this.props.stock.stock_symbol}
                </div>
                : null}
            <div>Shares</div>
            <div>
                <form onSubmit={this.handleSubmit} >
                <input type="text" value={this.state.watchlistinfo.num_stocks}
                    onChange={this.update('num_stocks')}
                />
                <div>Market Price {this.state.lastPrice}</div>
                <button>{this.state.buttonLabel}</button>
                </form>
                <div>{this.state.buyingPowerNumShare}</div>
                {
                    watch ?
                        null
                        :
                        <button onClick={this.removeFromList}>Remove from List</button>
                }
                {
                    addtoit ? 
                    <button onClick={this.addToList}>Add to List</button>
                    :
                    null
                }
                {this.renderErrors()}
            </div>
        </div>
    )
    }
}

}

const mSTP = (state, ownProps) => {
    return {
        errors: state.errors.watchlist
    }
}


const mDTP = (dispatch) => {
    return {
        createWatchlist: (watchlist, lastPrice) => dispatch(createWatchlist(watchlist, lastPrice)),
        updateWatchlist: (id, watchlist, lastPrice) => dispatch(updateWatchlist(id, watchlist, lastPrice)),
        fetchWatchlists: (user) => dispatch(fetchWatchlists(user)),
        sellWatchlist: (id, watchlist, lastPrice) => dispatch(sellWatchlist(id, watchlist, lastPrice))
    }
}

export default connect(mSTP, mDTP)(BuySellWatch)