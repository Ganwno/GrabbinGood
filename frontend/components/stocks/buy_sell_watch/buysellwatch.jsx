import React from 'react';
import { connect } from 'react-redux';
import {createWatchlist, fetchWatchlists, updateWatchlist, sellWatchlist} from '../../../actions/watchlist_actions'
import './buysell_style.css'

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
            accBal: this.props.accBal,
            color: true


        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.switchToSell = this.switchToSell.bind(this)
        this.switchToBuy = this.switchToBuy.bind(this)
        this.addToList = this.addToList.bind(this)
        this.removeFromList = this.removeFromList.bind(this)
        this.colorOfBuyingPower = this.colorOfBuyingPower.bind(this)
        this.displayLastPrice = this.displayLastPrice.bind(this)
    }

    componentDidMount() {
        this.props.fetchWatchlists(this.props.user).then((watchlists) => {
            // console.log(this.props.lastPrice)
            let arrWatchlist = Object.values(watchlists.watchlists);
            let i;
            let result;
            for (i = 0; i < arrWatchlist.length; i++) {
                if (this.props.stock.stock_symbol === arrWatchlist[i].stock_symbol) {
                    result = arrWatchlist[i].num_stocks
                    break;
                }
            }
            // console.log(result)
            this.setState({
                numOfShares: result,
                lastPrice: this.props.lastPrice,
                watchlist: Object.values(watchlists.watchlists)
            })

            // this.setState({
            //     lastPrice: this.props.lastPrice,
            //     watchlist: Object.values(watchlists.watchlists)
            // })
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
                let newNum = parseInt(this.state.watchlistinfo.num_stocks)
                newNum = this.state.numOfShares + newNum
                
                
                this.setState({
                    accBal: newAccountBal,
                    buyingPowerNumShare: `$${newAccountBal} Buying Power Available`,
                    numOfShares: newNum
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

                        let i;
                        let num_stocks = 0;
                        let arrayOfRes = Object.values(watchlists.watchlists)
                        for (i = 0; i < arrayOfRes.length; i++) {
                            if (this.props.stock.stock_symbol === arrayOfRes[i].stock_symbol) {
                                num_stocks = arrayOfRes[i].num_stocks
                                break;
                            }
                        }

                        this.setState({
                            watchlist: Object.values(watchlists.watchlists),
                            accBal: newAccountBal,
                            buyingPowerNumShare: `$${newAccountBal} Buying Power Available`,
                            numOfShares: num_stocks
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
        // let i;
        // for (i = 0; i < this.state.watchlist.length; i++) {
        //     if (this.props.stock.stock_symbol === this.state.watchlist[i].stock_symbol) {
        //         this.setState({
        //             buyingPowerNumShare: `${this.state.watchlist[i].num_stocks} Shares Available`,
        //             buttonLabel: 'Review Sell Order',
        //             numOfShares: this.state.watchlist[i].num_stocks
        //         })
        //         break;
        //     }
        // }
        this.setState({
            buyingPowerNumShare: `${this.state.numOfShares} Shares Available`,
            buttonLabel: 'Review Sell Order'
        })
    }

    switchToBuy(){
        this.setState({
            buyingPowerNumShare: `$${this.state.accBal} Buying Power Available`,
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

    colorOfBuyingPower() {
       let int = parseFloat(this.props.lastPercentChange)
        if (int > 0) {
            return '#3BD53F'
        }
        else {
            return '#FF6017'
        }
    }

    displayLastPrice() {
        if (this.state.lastPrice !== 0) {
            let lastPrice = this.state.lastPrice.toFixed(2)
            return(<div>
                ${lastPrice}
            </div>)
        }
        else {
            return null;
        }
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
        <div className="buysellwatch-form">
            <div className ="the-whole-form-minus-listwatch">
            <div className="buyorsellstock">
                    <div onClick={this.switchToBuy} className="buy-stock-title" 
                    style={{ color: this.colorOfBuyingPower(), borderBottom: `2px solid ${this.colorOfBuyingPower()}` }}>
            Buy {this.props.stock.stock_symbol}
            </div>
            {canSell ?
                <div onClick={this.switchToSell}>
                    Sell {this.props.stock.stock_symbol}
                </div>
                : null}
            </div>
            <div className="buysell-sub-form">
    
            
    
                <form onSubmit={this.handleSubmit} >
                <div className="shares-and-input-text">
                <div>Shares</div>
                <input type="text"  placeholder="0"
                    onChange={this.update('num_stocks')} className="input-for-buy-sell-stocks"/>
                </div>
                        <div className="marketprice-and-number"><div style={{ color: this.colorOfBuyingPower() }}>Market Price</div> 
                        <div>{this.displayLastPrice()}</div>
                        </div>
                        <button className="buywatch-button" style={{ backgroundColor: this.colorOfBuyingPower() }}>{this.state.buttonLabel}</button>
                </form>

                    <div className="buyingpower-shares" style={{ color: this.colorOfBuyingPower() }}>
                    {this.state.buyingPowerNumShare}</div>
            </div>
                {this.renderErrors()}
            </div>
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

//removed div around form