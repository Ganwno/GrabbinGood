import React from 'react';
import { connect } from 'react-redux';
import { fetchWatchlists } from '../../actions/watchlist_actions';

class Watchlist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            watchlists: {}
        }
    }


    render(){
        if (Object.keys(this.state.watchlists).length < 1) {
            this.props.fetchWatchlists(this.props.user.id).then(watchlists => {
                this.setState({
                    watchlists: watchlists
                })
            })
        }
        return(
            <div>
                {this.props.user.id}
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