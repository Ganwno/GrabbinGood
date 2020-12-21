import React from 'react';

class BuySellWatch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            numOfShares: ""
        }
    }

    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        })
    }



render() {
    return(
        <div>
            <div>
            Buy {this.props.stock.stock_symbol}
            </div>
            <div>
                {/* <form onSubmit={this.handleSubmit} className="whole-thing" > */}
                <input type="text" value={this.state.numOfShares}
                    onChange={this.update('numOfShares')}
                />
                {/* </form> */}
            </div>
        </div>
    )
}

}

export default BuySellWatch;