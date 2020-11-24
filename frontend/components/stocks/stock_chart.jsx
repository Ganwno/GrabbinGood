import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import React from 'react';

class StockChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            symbol: ""
        }
    }
// const data = [{ name: '1:00', uv: 400, pv: 2400, amt: 2400 }, { name: '1:30', uv: 200 },
// { name: '1:10', uv: 150 }, { name: '1:20', uv: 320 }
// ];

    render(){
        // refresh issue fixed
        if (this.state.symbol !== this.props.stock.stock_symbol){
            let stock = this.props.stock.stock_symbol.toLowerCase();
            let url = `https://cloud.iexapis.com/stable/stock/${stock}/intraday-prices?token=pk_dddf054b3e7d4ebf9009872325ff7376&chartInterval=5`
            fetch(url).then(response => response.json())
                .then(result => this.setState({data: result, symbol: this.props.stock.stock_symbol}))
        }
        return(
            <div>
                {/* <h2>
                    {this.state.data[this.state.data.length - 1]}
                </h2> */}
                <LineChart width={780} height={300} data={this.state.data}
                    margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <Line type="monotone" dataKey="high" stroke="#EE4E34" />
                    <CartesianGrid vertical={false} horizontalPoints={[50]} />
                    <XAxis dataKey="minute"  hide={true}/>
                    <YAxis type="number" domain={['dataMin', 'dataMax']} hide={true}/>
                    <Tooltip cursor={{ stroke: 'grey' }} coordinate={{ x: 0, y: -300 }} />
                </LineChart>
            </div>
        )
    }
}



export default StockChart;