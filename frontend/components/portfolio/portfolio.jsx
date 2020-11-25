import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import './portfolio_style.css'
import UserChart from './user_chart'
import SearchBarContainer from './search/search_bar_container';

class Portfolio extends React.Component {
    constructor(props) {
        super(props);
    this.state = {
        inputVal: ""
    } 
    }
     

    render() {
        return(
            <div>
                <div className = "nav-section">
                <SearchBarContainer/>
                <button onClick={this.props.logout} className = "logout-button">
                Log Out Here!
                </button>
                </div>
                <br/>
                <br/>
                <UserChart/>
                <br/>
            </div>
        )
    }

}



export default Portfolio;