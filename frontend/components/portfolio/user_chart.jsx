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

        this.setState({
            val: newVal,
            percentChange: percentChange,
            difference: difference
        })
    }




    componentDidMount(){
        this.props.chartInfo(this.props.ownStocks).then((output) => {
            let difference = output.output[output.output.length - 1].high - output.output[0].high;
            let percentChange = (difference / output.output[0].high) * 100
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
                data2: output.output,
                lastPrice: output.output[output.output.length -1].high,
                firstPrice: output.output[0].high,
                difference: difference,
                percentChange: percentChange,
                val: output.output[output.output.length - 1].high.toFixed(2)
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