import SessionForm from './session_form';
import {connect} from 'react-redux';
import {signup} from '../../actions/session_actions';
import { Link } from 'react-router-dom';
import React from 'react';
import { showStocks } from '../../actions/stock_actions'

const mSTP = ({errors}) => {
    return {
        errors: errors.session,
        formType: "Sign up",
        navLink: <Link to= "/login">Log In</Link>
    }
}

const mDTP = dispatch => {
    return {
        processForm: (user) => dispatch(signup(user)),
        showStocks: () => dispatch(showStocks())
    }
}

export default connect(mSTP, mDTP)(SessionForm);