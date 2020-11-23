import React from 'react';
import SearchBarContainer from '../portfolio/search/search_bar_container';
import StockChart from './stock_chart';

class StockDetail extends React.Component {
    
    constructor(props) {
        super(props);
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
           </div>
        )
    }
}

export default StockDetail;