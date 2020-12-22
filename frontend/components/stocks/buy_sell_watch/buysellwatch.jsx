import React from 'react';
import { connect } from 'react-redux';
import {createWatchlist, fetchWatchlists, updateWatchlist} from '../../../actions/watchlist_actions'

class BuySellWatch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            watchlistinfo: {
            stock_id: this.props.stock.id,
            user_id: this.props.user,
            num_stocks: 0
            },

            lastPrice: 0,
            watchlist: []

        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        this.props.fetchWatchlists(this.props.user).then((watchlists) => {
            console.log(Object.values(watchlists.watchlists))
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
        e.preventDefault();
        const watchlist = Object.assign({}, this.state.watchlistinfo)
        let count = 0;
        this.state.watchlist.forEach((obj) => {
            if ((this.props.stock.stock_symbol === obj.stock_symbol) && obj.num_stocks > 0) {
                count += 1;
            }
        })
        if (count === 1) {
            this.props.updateWatchlist(this.props.stock.id, watchlist)
        }
        else {
            this.props.createWatchlist(watchlist)
        }
        
    }




render() {
    if (this.state.lastPrice === 0) {
        return null
    }
    return(
        <div>
            <div>
            Buy {this.props.stock.stock_symbol}
            </div>
            <div>Shares</div>
            <div>
                <form onSubmit={this.handleSubmit} >
                <input type="text" value={this.state.numOfShares}
                    onChange={this.update('num_stocks')}
                />
                <div>Market Price {this.state.lastPrice}</div>
                <button>Review Order</button>
                </form>
            </div>
        </div>
    )
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
        fetchWatchlists: (user) => dispatch(fetchWatchlists(user))
    }
}

export default connect(mSTP, mDTP)(BuySellWatch)