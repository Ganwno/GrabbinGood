import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip} from 'recharts';
import React from 'react';
import './user_style.css';


class UserChart extends React.Component{ 
    constructor(props) {
        super(props);
        this.state = {
            data2: [],
            difference: '',
            percentChange: ''
        }
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.strokeColor = this.strokeColor.bind(this);
        this.handleMouseOff = this.handleMouseOff.bind(this)
    }
//    let url = `https://cloud.iexapis.com/stable/stock/${stock}/intraday-prices?token=pk_0df25c5085a9428590bbb49600f9487c&chartInterval=5`
// fetch(url).then(response => response.json())
//     .then((result) => { 

    strokeColor(){
        if (this.state.lastPrice - this.state.firstPrice >= 0) {
            return '#5EC933'
        }
        else {
            return '#EE4E34'
        }
    }


    handleMouseMove(e) {
        if (e.activePayload) {
            let currentPrice = e.activePayload[0].value
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

            this.setState({ val: currentPrice.toFixed(2), percentChange: percentChange, difference: difference })
        }
    }

    handleMouseOff() {
        let newVal = this.state.lastPrice
        if (this.state.lastPrice === null) {
            let result = this.state.data2.filter((obj) => {
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
        console.log(difference)

        this.setState({
            val: newVal,
            percentChange: percentChange,
            difference: difference
        })
    }




    componentDidMount(){
        let newData = []
        let obj = {};
        this.props.ownStocks.forEach((stock) => {
            // console.log(this.props.ownStocks)
            let stockSym = stock.stock_symbol;
        let url = `https://cloud.iexapis.com/stable/stock/${stockSym}/intraday-prices?token=pk_0df25c5085a9428590bbb49600f9487c&chartInterval=5`
            let promise = fetch(url).then(response => response.json())
            newData.push(promise)
        })
        Promise.all(newData).then((arr) => {
            const reducer = (accumulator, currentValue) => accumulator + currentValue;
            let arrOfStockSym = this.props.ownStocks
            let i;
            for (i = 0; i < arr.length - 1; i++) {
                arr[i].forEach((obj) => {
                    obj.high = obj.high * arrOfStockSym[i].num_stocks
                })
            }
            let output = [];
            let flattened = arr.flat();

            flattened.forEach(function (item) {
                var existing = output.filter(function (v, i) {
                    return v.label == item.label;
                });
                if (existing.length) {
                    var existingIndex = output.indexOf(existing[0]);
                    output[existingIndex].high = output[existingIndex].high.concat(item.high)
                } else {
                    if (typeof item.high == 'number')
                        item.high = [item.high];
                    output.push(item);
                }
            });
            output.forEach((obj) => {
                obj.high = obj.high.reduce(reducer)
            })
            // console.log(output)

            let difference = output[output.length - 1].high - output[0].high;
            let percentChange = (difference / output[0].high) * 100
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
            console.log(percentChange, difference)


            this.setState({
                data2: output,
                lastPrice: output[output.length -1].high,
                firstPrice: output[0].high,
                difference: difference,
                percentChange: percentChange,
                val: output[output.length - 1].high.toFixed(2)
            })
        })
    }


    render(){

        function CustomToolTip({ payload, label, active }) {
            if (active) {
                if (label.includes(":") === false) {
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


        if (this.state.data2.length < 1) {
            return null;
        }
        else {
        return(
    <div className = "user-portion-chart">
        <h1 className="stock-name-for-chart">
            ${this.state.val}
        </h1>
        <div className="percent-change">{this.state.difference} ({this.state.percentChange}) Today</div>
        <LineChart onMouseMove= {this.handleMouseMove}connectNulls={true} width={740} height={300} data={this.state.data2} 
        dot={false} onMouseLeave={() => this.handleMouseOff()}
        className = "chart"
            margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
            >
            <Line type="monotone" dataKey="high" stroke={this.strokeColor()} dot={false} />
            {/* <CartesianGrid vertical = {false} horizontalPoints={[50]}/> */}
            <XAxis dataKey="label" hide={true}/>
            <YAxis hide={true} domain={['dataMin', 'dataMax']}/>
            <Tooltip 
            wrapperStyle={{ left: -35 }}
            allowEscapeViewBox={{ x: true, y: true }}
            position={{ y: -30 }} cursor={{ stroke: 'grey' }} isAnimationActive={false} 
            content={<CustomToolTip />}
            />
        </LineChart>  
    </div>
        )
        }
    }
}

export default UserChart;