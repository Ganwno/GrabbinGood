import React from 'react';
import './user_news_style.css';
class UserNews extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            arrNews: [],
            firstRender: false,
            symbol: ''
        }

        this.newsToOneSetence = this.newsToOneSetence.bind(this)
    }

    newsToOneSetence(news) {
        let newsArr = news.summary.split(" ")
        return newsArr.slice(0, 22).join(" ") + "..."
    }

    render() {
        if (this.state.firstRender === false) {
            let arrOfStocks = ['msft', 'amzn', 'dis', 'aapl', 'sbux', 'tsla', 'zm', 'fb', 'nke'];
            let randomAsset = arrOfStocks[Math.floor(Math.random() * arrOfStocks.length)];
            this.props.retrieveNews(randomAsset).then((result) => {
                this.setState({arrNews: result.news, firstRender: true})
            })
        }

        return (
            <div className="whole-section-news-two">
                <h2 className="section-name-two">News</h2>
                <ul className="news-elements-two">
                    {this.state.arrNews.map((news, idx) => (
                        <a href={news.url} key={idx} className="news-link-two" target="_blank">
                            <li className='indiv-news-two'>
                                <div className='subsection-news-two'>
                                    <div className="news-source-two">{news.source}</div>
                                    <br />
                                    {news.headline}
                                    <br/>
                                    <br/>
                                    <div className="shortend-news-summ">
                                    {this.newsToOneSetence(news)}
                                    </div>
                                </div>
                                <img src={news.image} alt="" className='img-news-two' />
                            </li>
                        </a>
                    ))}

                </ul>
            </div>
        )
        
    }
}

export default UserNews