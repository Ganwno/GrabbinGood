import React from 'react';
import './news_section_style.css'

class NewsSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            arrNews: [],
            symbol: ''
        }
    }

    render() {
        console.log(this.props)
        if (this.props.stock.stock_symbol !== this.state.symbol) {
            let stock = this.props.stock.stock_symbol.toLowerCase()
            this.props.retrieveNews(stock)
                 .then(result => this.setState({ arrNews: result.news, symbol: this.props.stock.stock_symbol}))
        }
        //fixed infinite api call
        return (
            <div className = "whole-section-news">
                <h2 className = "section-name">News</h2>
            <ul className = "news-elements">
                {this.state.arrNews.map((news, idx) => (
                    <a href={news.url} key={idx} className="news-link">
                    <li  className = 'indiv-news'>
                        <div className = 'subsection-news'>
                            <div className = "news-source">{news.source}</div>
                        <br/>
                        {news.headline}
                        </div>
                        <img src={news.image} alt="" className ='img-news'/>
                    </li>
                    </a>
                ))}
                
            </ul>
            </div>
        )
    }
}

export default NewsSection;