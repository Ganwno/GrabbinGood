import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip} from 'recharts';
import React from 'react';
import './user_style.css';


class UserChart extends React.Component{ 
    constructor(props) {
        super(props);
    }
//    let url = `https://cloud.iexapis.com/stable/stock/${stock}/intraday-prices?token=pk_0df25c5085a9428590bbb49600f9487c&chartInterval=5`
// fetch(url).then(response => response.json())
//     .then((result) => { 



    render(){
        // if (this.props.ownStocks.length < 1) {}
        console.log(this.props.ownStocks)

        const data = [{ name: '9:00 AM', uv: 200, pv: 2400, amt: 2400 }, { name: '9:05 AM', uv: 200 },
        { name: '9:10 AM', uv: 200 }, { name: '9:15 AM', uv: 200 }, { name: '9:20 AM', uv: 200 },
        { name: '9:25 AM', uv: 200 }, { name: '9:30 AM', uv: 200 }, { name: '9:35 AM', uv: 200 }
        ];

        // const data = this.props.ownStocks;

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




        return(
    <div className = "user-portion-chart">
        <h1 className="stock-name-for-chart">
            $0.00
        </h1>
        <div className="percent-change">+$0.00 (+0.00%) Today</div>
        <LineChart connectNulls={true} width={740} height={300} data={data} 
        dot={false} 
        className = "chart"
            margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
            >
            <Line type="monotone" dataKey="uv" stroke="#EE4E34" />
            {/* <CartesianGrid vertical = {false} horizontalPoints={[50]}/> */}
            <XAxis dataKey="name" hide={true}/>
            <YAxis hide={true} domain={[0, 500]}/>
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

export default UserChart;