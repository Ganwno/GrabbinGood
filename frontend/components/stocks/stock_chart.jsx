import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import React from 'react';
import './stock_chart_style.css'

class StockChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            percentChange: '',
            symbol: "",
            lastPrice: ''
        }
    }
// const data = [{ name: '1:00', uv: 400, pv: 2400, amt: 2400 }, { name: '1:30', uv: 200 },
// { name: '1:10', uv: 150 }, { name: '1:20', uv: 320 }
// ];

    render(){
        // refresh issue fixed
        if (this.state.symbol !== this.props.stock.stock_symbol){
            let stock = this.props.stock.stock_symbol.toLowerCase();
            let url = `https://cloud.iexapis.com/stable/stock/${stock}/intraday-prices?token=pk_7f907de6dd184f68962cd03c99b625ce&chartInterval=5`
            fetch(url).then(response => response.json())
                .then(result => this.setState({data: result, symbol: this.props.stock.stock_symbol, 
                lastPrice: result[result.length-1].high
                }))
        }
        return(
            <div>
                <h1 className = "stock-name-for-chart">
                    ${this.state.lastPrice}
                </h1>
                <LineChart width={740} height={300} data={this.state.data} className = "chart"
                    margin={{top: 20, right: 20, bottom: 20, left: 20,}}>
                    <Line connectNulls={true} type="monotone" dataKey="high" stroke="#5EC933" dot ={false} 
                        strokeWidth={2}
                    />
                    <XAxis dataKey="minute"  hide={true}/>
                    <YAxis type="number" domain={['dataMin', 'dataMax']} hide={true}/>
                    <Tooltip cursor={{ stroke: 'grey' }} coordinate={{ x: 0, y: -300 }} />
                </LineChart>
            </div>
        )
    }
}



export default StockChart;