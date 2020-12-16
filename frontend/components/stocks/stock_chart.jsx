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
            val: '',
            difference: '',
            previousClose: 0
        }
        // this.theLastPrice = this.theLastPrice.bind(this);
        this.strokeColor = this.strokeColor.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseOff = this.handleMouseOff.bind(this)
    }


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
        let currentPrice =  e.activePayload[0].value  
        if (currentPrice === null) {
            return null;
        }      
        let difference = currentPrice - this.state.firstPrice
        let percentDecminal = difference / currentPrice
        let percentChange = percentDecminal * 100
        if (percentChange < 0) {
            percentChange = percentChange.toFixed(2) + "%"
        }
        else {
            percentChange = "+" + `${percentChange.toFixed(2)}` + "%"
        }
        if (difference >= 0) {
            difference = "+$" + `${difference.toFixed(2)}`
        }
        else {
            difference = `${difference.toFixed(2)}`
        }
        
            this.setState({val: currentPrice.toFixed(2), percentChange: percentChange, difference: difference})
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
             newVal = result.slice(-1)[0].high.toFixed(2)
        }
        else {
            newVal = this.state.lastPrice.toFixed(2)
        }
        let newLastPrice = newVal;
        let difference = newLastPrice - this.state.firstPrice
        let percentChange = (difference / this.state.firstPrice) * 100
        if (percentChange < 0) {
            percentChange = percentChange.toFixed(2) + "%"
        }
        else {
            percentChange = "+" + `${percentChange.toFixed(2)}` + "%"
        }
        if (difference >= 0) {
            difference = "+$" + `${difference.toFixed(2)}`
        }
        else {
            difference = `${difference.toFixed(2)}`
        }
        
        this.setState({
            val: newVal,
            percentChange: percentChange,
            difference: difference
        })
    }


    render(){
        // refresh issue fixed
        if (this.state.symbol !== this.props.stock.stock_symbol){
            let stock = this.props.stock.stock_symbol.toLowerCase();
            this.props.financial(stock)
                .then((result) => { 
                let difference = result.currentAsset[result.currentAsset.length - 1].high - result.currentAsset[0].high;
                    let percentChange = (difference / result.currentAsset[0].high) * 100
                if (percentChange < 0) {
                        percentChange = percentChange.toFixed(2) + "%"
                    }
                else {
                        percentChange = "+" + `${percentChange.toFixed(2)}` + "%"
                    }
                if (difference >= 0 ) {
                    difference = "+$" + `${difference.toFixed(2)}`
                }
                else {
                    difference = `${difference.toFixed(2)}`
                }

                this.setState({data: result.currentAsset, symbol: this.props.stock.stock_symbol, 
                lastPrice: result.currentAsset[result.currentAsset.length-1].high, 
                firstPrice: result.currentAsset[0].high, 
                val: result.currentAsset[result.currentAsset.length-1].high.toFixed(2),
                previousClose: result.currentAsset[result.currentAsset.length - 1].close,
                difference: difference,
                percentChange: percentChange
                })
            })
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
        <div className = "percent-change">{this.state.difference} ({this.state.percentChange}) Today</div>
                <LineChart onMouseMove={this.handleMouseMove} onMouseLeave={() => this.handleMouseOff()} width={740} height={300} data={this.state.data} className = "chart"
                    margin={{top: 20, right: 20, bottom: 20, left: 20,}}>
                    <Line connectNulls={true} type="monotone" dataKey="high" stroke={this.strokeColor()} dot ={false} 
                        strokeWidth={2}
                    />
                    <CartesianGrid vertical={false} horizontalPoints={[this.state.previousClose]} strokeDasharray={"3 3"}/>
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