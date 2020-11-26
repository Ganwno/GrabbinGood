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
            lastPrice: '',
            firstPrice: '',
            val: ''
        }
        // this.theLastPrice = this.theLastPrice.bind(this);
        this.strokeColor = this.strokeColor.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseOff = this.handleMouseOff.bind(this)
    }
// const data = [{ name: '1:00', uv: 400, pv: 2400, amt: 2400 }, { name: '1:30', uv: 200 },
// { name: '1:10', uv: 150 }, { name: '1:20', uv: 320 }
// ];

    //     componentDidMount(){
    //     if(this.state.lastPrice === null) {
    //         let result = this.state.data.filter((obj) => {
    //             if (obj.high != null) {
    //                 return obj
    //             } 
    //         })
    //        this.setState({ val: result.slice(-1)[0].high })
    //     }
    //     else {
    //         this.setState({ val: this.state.lastPrice })
    //     }
    // }

    // }
    //if last price is null find the last price in array

    strokeColor(){

        if(this.state.lastPrice > this.state.firstPrice) {
            return '#5EC933'
        }
        else {
            return '#EE4E34'
        }
    }

    handleMouseMove(e){
        if(e.activePayload){
            this.setState({val: e.activePayload[0].value})
        }
        // else if (e.activePayload === null || e.activePayload[0].value === null){
        //     return null;
        // }
    }

    handleMouseOff() {
        let newVal = this.state.lastPrice 
        if (this.state.lastPrice === null) {
            let result = this.state.data.filter((obj) => {
                if (obj.high != null) {
                    return obj
                }
            })
             newVal = result.slice(-1)[0].high
        }
        else {
            newVal = this.state.lastPrice
        }
        this.setState({
            val: newVal
        })
    }

    render(){
        // refresh issue fixed
        if (this.state.symbol !== this.props.stock.stock_symbol){
            let stock = this.props.stock.stock_symbol.toLowerCase();
            let url = `https://cloud.iexapis.com/stable/stock/${stock}/intraday-prices?token=pk_7f907de6dd184f68962cd03c99b625ce&chartInterval=5`
            fetch(url).then(response => response.json())
                .then(result => this.setState({data: result, symbol: this.props.stock.stock_symbol, 
                lastPrice: result[result.length-1].high, firstPrice: result[0].high, val: result[result.length-1].high
                }))
        }


        function CustomToolTip({ payload, label, active }) {
            if (active) {
                if(label.includes(":") === false) {
                    label = label.split(" ").join(":00 ")
                }
                return (
                    <div>
                        <p>{`${label}`}</p>
                    </div>
                );
            }

            return null;
        }

        return(
            <div>
                <h1 className = "stock-name-for-chart">
                    ${this.state.val}
                </h1>
                <LineChart onMouseMove={this.handleMouseMove} onMouseLeave={() => this.handleMouseOff()} width={740} height={300} data={this.state.data} className = "chart"
                    margin={{top: 20, right: 20, bottom: 20, left: 20,}}>
                    <Line connectNulls={true} type="monotone" dataKey="high" stroke={this.strokeColor()} dot ={false} 
                        strokeWidth={2}
                    />
                    <XAxis dataKey="label"  hide={true}/>
                    <YAxis type="number" domain={['dataMin', 'dataMax']} hide={true}/>
                    <Tooltip 
                    wrapperStyle={{ left: -35 }}
                    allowEscapeViewBox={{x: true, y: true}}
                    position={{ y: -20 }} cursor={{ stroke: 'grey' }} isAnimationActive={false} 
                    content = {<CustomToolTip/>}
                    />
                </LineChart>
            </div>
        )
    }
}



export default StockChart;