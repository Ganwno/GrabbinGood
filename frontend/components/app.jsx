import React from 'react';
import {Route, Redirect, Switch, Link, HashRouter} from 'react-router-dom';

import GreetingContainer from './greeting/greeting_container';
import LoginFormContainer from './session_form/login_form_container';
import SignupFormContainer from './session_form/signup_form_container';
import {AuthRoute} from '../util/route_util';

const App = () => (
    <div className = "entire-app">
        <header>
        </header>
        <Switch>
        <AuthRoute exact path= "/login" component={LoginFormContainer} />
        <AuthRoute exact path = "/signup" component= {SignupFormContainer}/>
        <Route exact path ="/" component={GreetingContainer}/>
        </Switch>
    </div>
)

export default App;