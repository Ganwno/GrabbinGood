import React from 'react';
import SearchBarContainer from '../portfolio/search/search_bar_container';
import StockChart from './stock_chart';
import AboutSectionContainer from './about_section';
import NewsSection from './news_section_container';
import AccountDropDown from '../portfolio/dropdownacc/account_drop_down';
import BuySellWatch from './buy_sell_watch/buysellwatch'
import './stock_detail_style.css';

import {Link} from 'react-router-dom';

class StockDetail extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            symbol: '',
            description: '',
            accountBal: ''
        }
        
    }

    componentDidMount(){
        this.props.showStocks()
        this.props.fetchUserAccBal(this.props.user)
        
    }



    render() {
        if (this.props.stock === undefined || this.props.primAccBal === undefined) {
            return null;
        }
        //fixes refresh issue
        return(
            <div className = 'stock-detail-page'>
                <div className="nav-bar">
                <div className ="left-nav">
                <Link to={'/'}>
                <img src="/images/logo.jpeg" alt="" className="logo-image"></img>
                </Link>
                <SearchBarContainer />
                </div>
                <AccountDropDown logout={this.props.logout} accountBalance={this.props.accBal} username={this.props.username}/>
                </div>
                <br/>
                <div className = 'page-content'>
                <h1 className = 'stock-name'>{this.props.stock.company_name}</h1>
                <StockChart stock={this.props.stock} financial={this.props.updateCurrentFinanceInfo} user={this.props.user} accBal={this.props.accBal}/>  
                <AboutSectionContainer stock={this.props.stock} /> 
                <br/>
                <NewsSection stock={this.props.stock} retrieveNews={this.props.updateCurrentCompanyNews}/> 
                <br/>
                </div>
           </div>
        )
    }
}

export default StockDetail;