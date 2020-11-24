import React from 'react';
import SearchBarContainer from '../portfolio/search/search_bar_container';
import StockChart from './stock_chart';
import AboutSectionContainer from './about_section';
import NewsSection from './news_section_container';
import {Link} from 'react-router-dom'

class StockDetail extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            symbol: '',
            description: ''
        }
    }

    componentDidMount(){
        
        this.props.showStocks()
        
    }

    render() {
        if (!this.props.stock) {
            return null;
        }
        //fixes refresh issue
        return(
            <div>
                <SearchBarContainer />
                <br/>
                <h1>{this.props.stock.company_name}</h1>
                <StockChart stock={this.props.stock}/>
                <AboutSectionContainer stock={this.props.stock}/>
                <br/>
                <NewsSection stock = {this.props.stock}/>
                <br/>
                <Link to={'/'}><button onClick={this.props.logout}>Log Out Here!</button></Link>
           </div>
        )
    }
}

export default StockDetail;