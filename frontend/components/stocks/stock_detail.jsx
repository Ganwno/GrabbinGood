import React from 'react';

class StockDetail extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div>
                {console.log(this.props)}
                Hi
            </div>
        )
    }
}

export default StockDetail;