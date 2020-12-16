import React from 'react';
import { connect } from 'react-redux';
import { updateCurrentCompanyInfo, updateCurrentFinanceInfo } from '../../actions/external_stock_actions';
import './about_section_style.css'

class AboutSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            symbol: '',
            description: '',
            employees: '',
            city: '',
            state: '',
            CEO: ''

        }
        this.employees = this.employees.bind(this);

    }

    employees(){
        if(this.state.employees === null) {
            return 'N/A'
        }
        else {
            return this.state.employees
        }
    }
    componentDidMount() {
        let symbol = this.props.stock.stock_symbol
        this.props.updateInfo(symbol)
            .then(result =>
                this.setState({
                    symbol: result.generalInfo.symbol, description: result.generalInfo.description,
                    employees: result.generalInfo.employees, city: result.generalInfo.city, state: result.generalInfo.state, CEO: result.generalInfo.CEO
                }))
    }



    render() {
        if(this.props.stock.stock_symbol !== this.state.symbol) {
            return null
                }
        return(
        <div>
            <h2>About</h2>
        <p className = 'descript'>{this.state.description}</p>
        <div className = 'company-stats'>
            <div className = 'ceo'>
                <h3>CEO</h3>
                <div className = 'ceo-name'>{this.state.CEO}</div>
            </div>
            <div className = 'employees'>
                <h3>Employees</h3>
                <div className = 'employees-names'>{this.employees()}</div>
            </div>
            <div className = 'headquarters'>
                <h3>Headquarters</h3>
                <div className = 'headquarters-name'>{this.state.city}, {this.state.state}</div>
            </div>
        </div>
        </div>
        )
    }
}

const mSTP = (state, ownProps) => {
    return {
    info: state.entities.currentAsset.info,
    financial: state.entities.currentAsset.company
    }
}

const mDTP = (dispatch) => {
    return {
        updateInfo: (sym) => dispatch(updateCurrentCompanyInfo(sym))
    }

}



export default connect(mSTP, mDTP)(AboutSection)


