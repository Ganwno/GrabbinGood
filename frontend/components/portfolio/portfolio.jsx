import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import './portfolio_style.css'
import UserChart from './user_chart'
import SearchBarContainer from './search/search_bar_container';
import AccountDropDown from './dropdownacc/account_drop_down';
import UserNews from './news/user_news';
import WatchlistContainer from '../watchlist/watchlist'

class Portfolio extends React.Component {
    constructor(props) {
        super(props);
    this.state = {
        inputVal: "",
        watchlist: []
    } 
    }

    componentDidMount() {
        this.props.fetchWatchlists(this.props.user).then(watchlists => {
            console.log(watchlists)
            this.setState({
            watchlist: Object.values(watchlists.watchlists)
            })
        })
    }
     

    render() {
        if (this.state.watchlist.length < 1){
        return null;
        }

        return(
            <div className = "portfolio">
                <div className = "nav-bar">
                <div className= "left-nav">
                <Link to={'/'}>
                <img src="/images/logo.jpeg" alt="" className="logo-image"></img>
                </Link>
                <SearchBarContainer/>
                </div>
                <AccountDropDown logout={this.props.logout}/>
                </div>
                <div className="page-content">
                <br/>
                <UserChart ownStocks={this.state.watchlist} chartInfo={this.props.updateUserChart}/>
                <UserNews/>
                <WatchlistContainer watchlist={this.state.watchlist} />
                </div>
                <br/>
            </div>
        )
    }

}



export default Portfolio;