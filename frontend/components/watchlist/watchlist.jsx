import React from 'react';

class Watchlist extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <div>
                {this.props.user.id}
            </div>
        )
    }
}

export default Watchlist;