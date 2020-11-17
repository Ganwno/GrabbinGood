import React from 'react';
import {Link} from 'react-router-dom';

const Greeting = ({currentUser, logout}) => {
    const sessionLinks = () => (
        <nav className= "login-signup">
            <Link to = "/login">Login</Link>
            &nbsp;&nbsp;
            <Link to ="/signup">Sign up</Link>
        </nav>
    )

    const signedIn = () => (
    <div>
        <h1>Hi {currentUser.username}</h1>
            <button onClick = {logout}>Log Out Here!</button>
    </div>
    )

    return currentUser ? signedIn() : sessionLinks();
}

export default Greeting;

