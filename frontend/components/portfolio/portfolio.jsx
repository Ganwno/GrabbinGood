import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import './portfolio_style.css'

class Portfolio extends React.Component {
    constructor(props) {
        super(props);
        this.buttonPress = this.buttonPress.bind(this);
      
    }

    componentDidMount() {
        const searchSuggestions = () => {
        const companies = this.props.stocks;
         const searchInput = document.querySelector('.search-bar')
         const suggestionsPanel = document.querySelector('.suggestions')
            searchInput.addEventListener('keyup', function(){
            const input = searchInput.value.toLowerCase(); 
            suggestionsPanel.innerHTML = "";
            const suggestions = companies.filter(function(companies){
                return companies.stock_symbol.toLowerCase().startsWith(input)
            })
            suggestions.forEach(function(suggested) {
                const div = document.createElement('div');
                div.className = 'stock-selector'
                div.innerHTML = suggested.stock_symbol
                suggestionsPanel.appendChild(div);
            })
                if (input === "") {
                    suggestionsPanel.innerHTML = '';
                }
        });
    }
        if (this.props.stocks.length < 1) {
            this.props.showStocks().then(() => searchSuggestions())
        }
        else {
            searchSuggestions();
        }

    }



    buttonPress(e){
        e.preventDefault();
        this.props.showStock({id: 1, company_name: "Amazon", description: "this is a test for jbuilder",
    stock_symbol: "AMZN", price: 1465
    })

    }


    render() {
        return(
            <div>
                <div className="search-section">
                    <input type="text" placeholder = "Search" className = "search-bar"/>
                    <div className = "suggestions">
                    </div>
                </div>
                {/* <Link to= {`/stocks/1`} ><button onClick={this.buttonPress}>Amazon</button></Link> */}
                <br/>
                <button onClick={this.props.logout}>Log Out Here!</button>
            </div>
        )
    }
}

export default Portfolio;