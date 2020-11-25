import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip} from 'recharts';
import React from 'react';
import './user_style.css';

const data = [{ name: '1:00', uv: 400, pv: 2400, amt: 2400 },{name: '1:30', uv:200},
{name: '1:10', uv: 150}, {name: '1:20', uv: 320}
];

const UserChart = () => (
    <div>
        
        <LineChart width={780} height={300} data={data}
            margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
            >
            <Line type="monotone" dataKey="uv" stroke="#EE4E34" />
            <CartesianGrid vertical = {false} horizontalPoints={[50]}/>
            <XAxis dataKey="name" hide={true}/>
            <YAxis hide = {true}/>
            <Tooltip cursor={{ stroke: 'grey' }} coordinate={{ x:0, y: -300} }/>
        </LineChart>
        
    </div>
);

export default UserChart;