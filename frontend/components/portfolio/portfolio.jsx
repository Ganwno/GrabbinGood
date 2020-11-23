import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import './portfolio_style.css'
import UserChart from './user_chart'
import SearchBarContainer from './search/searh_bar_container';

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
                <SearchBarContainer/>
                <br/>
                <br/>
                <UserChart/>
                <br/>
                <button onClick={this.props.logout}>Log Out Here!</button>
            </div>
        )
    }

}



export default Portfolio;