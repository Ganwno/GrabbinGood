import React from 'react';
import {Route, Redirect, Switch, Link, HashRouter} from 'react-router-dom';

import GreetingContainer from './greeting/greeting_container';
import LoginFormContainer from './session_form/login_form_container';
import SignupFormContainer from './session_form/signup_form_container';
import {AuthRoute, ProtectedRoute} from '../util/route_util';
import StockDetailContainer from './stocks/stock_container';
import PortfolioContainer from './portfolio/portfolio_container';

const App = () => (
    <div className = "entire-app">
        <header>
        </header>
        <Switch>
        <AuthRoute exact path= "/login" component={LoginFormContainer} />
        <AuthRoute exact path = "/signup" component= {SignupFormContainer}/>
        <AuthRoute exact path ="/" component={GreetingContainer}/>
        <ProtectedRoute path = "/portfolio" component= {PortfolioContainer}/>
        <Route exact path = {`/stocks/:id`} component = {StockDetailContainer}/>
        </Switch>
    </div>
)
// need to figure out how to make it so you can only visit /portfolio if logged in.

export default App;