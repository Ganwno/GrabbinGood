import React from 'react';
import { Link } from 'react-router-dom';
import './search.css'

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputVal: ""
        }
        this.handleChange = this.handleChange.bind(this)
        this.clearSearch = this.clearSearch.bind(this)
    }

    handleChange(e) {
        this.setState({ inputVal: e.target.value })
    }

    clearSearch(e){
        this.setState({inputVal: ''})
    }
    //helps clear search bar when clicking a link

    render() {
        let matchedInputs = [];
        if (this.props.stocks.length < 1) {
            //fixes refresh issue
            //rando comment
            this.props.showStocks().then(() => {
                const searchKey = this.state.inputVal.toLowerCase();
                if (searchKey && searchKey.length > 0) {
                    matchedInputs = this.props.stocks.filter(stock => {
                        return stock.stock_symbol.toLowerCase().match(searchKey) || stock.company_name.toLowerCase().match(searchKey)
                    })
                }
            })
        }
        else {
            const searchKey = this.state.inputVal.toLowerCase();
            if (searchKey && searchKey.length > 0) {
                matchedInputs = this.props.stocks.filter(stock => {
                    return stock.stock_symbol.toLowerCase().match(searchKey) || stock.company_name.toLowerCase().match(searchKey)
                })
            }
        }


    return(
        <div>
            <div className = "search-section" >
                <input type="text" placeholder="Search" className="search-bar" 
                onChange={this.handleChange} />
                    <div className = "suggestions">
                        {
                            matchedInputs.map((stock, idx) => {
                            return <div key = {idx} className="indiv-suggestions">
                            <Link to={{pathname: `/stocks/${stock.id}`}} className = 'link' 
                            onClick={this.clearSearch}
                            >
                                    {stock.stock_symbol}    {stock.company_name}
                            </Link>
                            </div>
                            })  
                           
                            
                        }
                    </div>
            </div>
        </div>
    )
    }
}

export default SearchBar;