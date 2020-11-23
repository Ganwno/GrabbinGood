import React from 'react';
import SearchBarContainer from '../portfolio/search/searh_bar_container';

class StockDetail extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        return(
            <div>
                <SearchBarContainer/>
            </div>
        )
    }
}

export default StockDetail;