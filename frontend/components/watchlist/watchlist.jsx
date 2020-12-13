import React from 'react';
import { connect } from 'react-redux';
import { fetchWatchlists } from '../../actions/watchlist_actions';

class Watchlist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            watchlists: []
        }
        this.doesUserHaveStocks = this.doesUserHaveStocks.bind(this)
    }

    doesUserHaveStocks() {
        if (this.state.watchlists.length < 1) {
            return false
        }
        else {
            return true
        }
    }

//Object.values(watchlists.watchlists)



    render(){
        if (Object.keys(this.state.watchlists).length < 1) {
            this.props.fetchWatchlists(this.props.user).then(watchlists => {
                this.setState({
                    watchlists: Object.values(watchlists.watchlists)
                })
            })
        }
        return(
            <div>
                <div>
                Stocks
                </div>
                {this.doesUserHaveStocks() ? 
                    this.state.watchlists.map((watchlist, idx) => (
                        <div key = {idx}>
                            {watchlist.stock_symbol}
                            {watchlist.num_stocks}
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