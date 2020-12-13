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


    render(){
        if (Object.keys(this.state.watchlists).length < 1) {
            this.props.fetchWatchlists(this.props.user).then(watchlists => {
                console.log(watchlists)
                this.setState({
                    watchlists: Object.values(watchlists.watchlists)
                })
            })
        }
        return(
            <div>
                {this.props.user}
                <div>
                Stocks
                </div>
                {this.doesUserHaveStocks() ? 
                this.state.watchlists.map((watchlist) => (
                    <div>
                        {watchlist.stock}
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