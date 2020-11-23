import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import './portfolio_style.css'
import StockContainer from '../stocks/stock_container';
import UserChart from './user_chart'

class Portfolio extends React.Component {
    constructor(props) {
        super(props);
    this.state = {
        inputVal: ""
    }
      this.handleChange = this.handleChange.bind(this)
      

      
    }
    


    handleChange(e) {
        this.setState({inputVal: e.target.value})
    }

    


    render() {
        let matchedInputs = [];
        if (this.props.stocks.length < 1) {
            //fixes refresh issue
            this.props.showStocks().then(() =>{
                const searchKey = this.state.inputVal.toLowerCase();
                if (searchKey && searchKey.length > 0) {
                    matchedInputs = this.props.stocks.filter(stock => {
                        return stock.stock_symbol.toLowerCase().match(searchKey)
                    })
                }
            })
    }
    else {
            const searchKey = this.state.inputVal.toLowerCase();
            if (searchKey && searchKey.length > 0) {
                matchedInputs = this.props.stocks.filter(stock => {
                    return stock.stock_symbol.toLowerCase().match(searchKey)
                })
            }
    }
        
        return(
            <div>
                <div className="search-section">
                    <input type="text" placeholder="Search" className="search-bar" 
                    onChange={this.handleChange} />
                    <div className = "suggestions">
                        {
                            matchedInputs.map((stock, idx) => {
                            return <div key = {idx}><Link to={"/stocks/1"}>{stock.stock_symbol}</Link></div>
                            })  
                           
                            
                        }
                    </div>
                </div>
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