import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import './portfolio_style.css'
import UserChart from './user_chart'
import SearchBarContainer from './search/search_bar_container';
import AccountDropDown from './dropdownacc/account_drop_down';
import UserNews from './news/user_news';

class Portfolio extends React.Component {
    constructor(props) {
        super(props);
    this.state = {
        inputVal: ""
    } 
    }
     

    render() {
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
                <UserChart/>
                <UserNews/>
                </div>
                <br/>
            </div>
        )
    }

}



export default Portfolio;