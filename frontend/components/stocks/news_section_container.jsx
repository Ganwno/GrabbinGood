import React from 'react';
import './news_section_style.css'

class NewsSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            arrNews: []
        }
    }

    render() {
        if (this.props.stock.stock_symbol !== this.state.symbol) {
            let stock = this.props.stock.stock_symbol.toLowerCase()
            let url = `https://cloud.iexapis.com/stable/stock/${stock}/news/last/2?token=pk_7d93844855214a2f9fc4c2b10d900df5`;
             fetch(url).then(response => response.json())
                .then(result => this.setState({arrNews: result}))
        }
        return (
            <div>
                <h2 className = "section-name">News</h2>
            <ul className = "news-elements">
                {this.state.arrNews.map((news, idx) => (
                    <li key = {idx} className = 'indiv-news'>
                        <div className = 'subsection-news'>
                            <div className = "news-source">{news.source}</div>
                        <br/>
                        <a href={news.url} className = "news-link">{news.headline}</a>
                        </div>
                        <img src={news.image} alt="" className ='img-news'/>
                    </li>
                ))}
                
            </ul>
            </div>
        )
    }
}

export default NewsSection;