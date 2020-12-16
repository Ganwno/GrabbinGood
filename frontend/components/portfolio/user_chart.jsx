import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip} from 'recharts';
import React from 'react';
import './user_style.css';


class UserChart extends React.Component{ 
    constructor(props) {
        super(props);
        this.state = {
            data2: []
        }
    }
//    let url = `https://cloud.iexapis.com/stable/stock/${stock}/intraday-prices?token=pk_0df25c5085a9428590bbb49600f9487c&chartInterval=5`
// fetch(url).then(response => response.json())
//     .then((result) => { 
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
            this.setState({
                data2: output
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
            $0.00
        </h1>
        <div className="percent-change">+$0.00 (+0.00%) Today</div>
        <LineChart connectNulls={true} width={740} height={300} data={this.state.data2} 
        dot={false} 
        className = "chart"
            margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
            >
            <Line type="monotone" dataKey="high" stroke="#EE4E34" />
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