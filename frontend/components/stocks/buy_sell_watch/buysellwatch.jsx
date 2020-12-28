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

            numOfShares: '',
            lastPrice: 0,
            watchlist: [],
            buyingPowerNumShare: `$${this.props.accBal} Buying Power Available`,
            buttonLabel: 'Review Order'


        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.switchToSell = this.switchToSell.bind(this)
        this.switchToBuy = this.switchToBuy.bind(this)
        this.addToList = this.addToList.bind(this)
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
        if (this.state.buyingPowerNumShare === `$${this.props.accBal} Buying Power Available`) {
            const watchlist = Object.assign({}, this.state.watchlistinfo)
            let count = 0;
            this.state.watchlist.forEach((obj) => {
                if ((this.props.stock.stock_symbol === obj.stock_symbol) && obj.num_stocks > 0) {
                count += 1;
                }
            })
            if (count === 1) {
                this.props.updateWatchlist(this.props.stock.id, watchlist)
                // this.setState({
                //     watchlistinfo: {...this.state.watchlistinfo, num_stocks: 0}
                // })
            }
            else {
                this.props.createWatchlist(watchlist)
                // this.setState({
                //     watchlistinfo: { ...this.state.watchlistinfo, num_stocks: 0 }
                // })
            }

        }
        else {
            console.log(this.state.lastPrice)
            const watchlist = Object.assign({}, this.state.watchlistinfo)
            this.props.sellWatchlist(this.props.stock.id, watchlist, this.state.lastPrice)
        }
        
    }

    switchToSell(){
        let i;
        for (i = 0; i < this.state.watchlist.length; i++) {
            if (this.props.stock.stock_symbol === this.state.watchlist[i].stock_symbol) {
                this.setState({
                    buyingPowerNumShare: `${this.state.watchlist[i].num_stocks} Shares Available`,
                    buttonLabel: 'Review Sell Order'
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
        this.props.createWatchlist(watchlist)
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
        let watch = true;
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
            if (this.props.stock.stock_symbol === this.state.watchlist[j].stock_symbol) {
                watch = false;
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
                        <button onClick={this.addToList}>Add to Lists</button>
                        :
                        null
                }
            </div>
        </div>
    )
    }
}

}

const mSTP = (state, ownProps) => {
    return {
        blank: 'hi'
    }
}


const mDTP = (dispatch) => {
    return {
        createWatchlist: (watchlist) => dispatch(createWatchlist(watchlist)),
        updateWatchlist: (id, watchlist) => dispatch(updateWatchlist(id, watchlist)),
        fetchWatchlists: (user) => dispatch(fetchWatchlists(user)),
        sellWatchlist: (id, watchlist, lastPrice) => dispatch(sellWatchlist(id, watchlist, lastPrice))
    }
}

export default connect(mSTP, mDTP)(BuySellWatch)