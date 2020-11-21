import SessionForm from './session_form';
import { connect } from 'react-redux';
import { login } from '../../actions/session_actions';
import { Link } from 'react-router-dom';
import {showStocks} from '../../actions/stock_actions'
import React from 'react';

const mSTP = ({errors}) => {
    return {
        errors: errors.session,
        formType: 'Login',
        navLink: <Link to= '/signup'>Sign Up</Link>
    }
}

const mDTP = dispatch => {
    return {
        processForm: (user) => dispatch(login(user)),
        showStocks: () => dispatch(showStocks())
    }
}

export default connect(mSTP, mDTP)(SessionForm);