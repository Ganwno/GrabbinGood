import React from 'react';
import { connect } from 'react-redux';
import {createWatchlist} from '../../../actions/watchlist_actions'

class BuySellWatch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stock_id: this.props.stock.id,
            user_id: this.props.user,
            num_stocks: 0,

        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const watchlist = Object.assign({}, this.state)
        this.props.createWatchlist(watchlist)
    }



render() {
    return(
        <div>
            <div>
            Buy {this.props.stock.stock_symbol}
            </div>
            <div>
                <form onSubmit={this.handleSubmit} >
                <input type="text" value={this.state.numOfShares}
                    onChange={this.update('num_stocks')}
                />
                <button>Buy</button>
                </form>
            </div>
        </div>
    )
}

}

const mSTP = (state, ownProps) => {
    return {
        filler: 'hi'
    }
}


const mDTP = (dispatch) => {
    return {
        createWatchlist: (watchlist) => dispatch(createWatchlist(watchlist))
    }
}

export default connect(mSTP, mDTP)(BuySellWatch)