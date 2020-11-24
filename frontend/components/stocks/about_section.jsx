import React from 'react';
import { connect } from 'react-redux';
import { updateCurrentCompanyInfo, updateCurrentFinanceInfo } from '../../actions/external_stock_actions';
class AboutSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            symbol: '',
            description: '',

        }
        

    }

    // componentDidMount(){
    //     let symbol = this.props.stock.stock_symbol
    //     console.log(symbol);
    //     let url = `https://cloud.iexapis.com/stable/stock/${symbol}/company?token=pk_ad1084a6b8f141fd80e5996f98df89f6`
    //     fetch(url).then(response => response.json())
    //     .then(result => this.setState({symbol: result.symbol, description: result.description}))
    //     let url2 = `https://cloud.iexapis.com/stable/stock/${symbol}/intraday-prices?token=pk_ad1084a6b8f141fd80e5996f98df89f6`
    //     fetch(url2).then(response => response.json())
    //     .then(result => console.log())
        
    // }



    render() {
        if(this.props.stock.stock_symbol !== this.state.symbol) {
            let symbol = this.props.stock.stock_symbol
            let url = `https://cloud.iexapis.com/stable/stock/${symbol}/company?token=pk_ad1084a6b8f141fd80e5996f98df89f6`
            fetch(url).then(response => response.json())
                .then(result => this.setState({ symbol: result.symbol, description: result.description }))
            // let url2 = `https://cloud.iexapis.com/stable/stock/${symbol}/intraday-prices?token=pk_ad1084a6b8f141fd80e5996f98df89f6`
            // fetch(url2).then(response => response.json())
            //     .then(result => console.log())
        }
        return(
        <div>
            <h2>hi its me</h2>
            <p>{this.props.stock.company_name}</p>
            <h2>About</h2>
            <div>HI</div>
        <p>{this.state.description}</p>
        </div>
        )
    }
}

const mSTP = (state, ownProps) => {
    return {
    info: state.entities.currentAsset.info,
    financial: state.entities.currentAsset.company
    }
}

const mDTP = (dispatch) => {
    return {
        updateInfo: (sym) => dispatch(updateCurrentCompanyInfo(sym)),
        updateFinancial: (sym) => dispatch(updateCurrentFinanceInfo(sym))
    }

}



export default connect(mSTP, mDTP)(AboutSection)


