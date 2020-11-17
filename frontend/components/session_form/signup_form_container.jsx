import SessionForm from './session_form';
import {connect} from 'react-redux';
import {signup} from '../../actions/session_actions';
import { Link } from 'react-router-dom';
import React from 'react';

const mSTP = ({errors}) => {
    return {
        errors: errors.session,
        formType: "signup",
        navLink: <Link to= "/login">Log In Instead</Link>
    }
}

const mDTP = dispatch => {
    return {
        processForm: (user) => dispatch(signup(user))
    }
}

export default connect(mSTP, mDTP)(SessionForm);