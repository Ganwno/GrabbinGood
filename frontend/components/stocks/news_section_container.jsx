import React from 'react';


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
            let url = `https://cloud.iexapis.com/stable/stock/${stock}/news/last/3?token=pk_dddf054b3e7d4ebf9009872325ff7376`;
             fetch(url).then(response => response.json())
                .then(result => this.setState({arrNews: result}))
        }
        return (
            <div>
                <h2>News</h2>
            <ul>
                {this.state.arrNews.map((news, idx) => (
                    <li key = {idx}>
                        {news.source}
                        <a href={news.url}>{news.headline}</a>
                        <img src={news.image} alt=""/>
                    </li>
                ))}
                
            </ul>
            </div>
        )
    }
}

export default NewsSection;