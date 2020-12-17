import React from "react";
import ReactDOM from "react-dom";
import configureStore from './store/store';
import Root from './components/root';

//testing
import { login, logout} from './actions/session_actions';
import {showStock, showStocks} from './actions/stock_actions'

document.addEventListener("DOMContentLoaded", () => {
    let store;
    if (window.currentUser) {
        const preloadedState = {
            entities: {
                users: {[window.currentUser.id]: window.currentUser}
            },
            session: {id: window.currentUser.id}
        };
        store = configureStore(preloadedState);
        delete window.currentUser;
    }
    else {
        store = configureStore();
    }
    const root = document.getElementById("root");

    //testing only
    window.dispatch = store.dispatch;
    window.getState = store.getState;
    window.login = login;
    window.logout = logout;
    window.showStock = showStock;
    window.showStocks = showStocks;
 

    
    ReactDOM.render(<Root store = {store}/>, root);

   
    
});