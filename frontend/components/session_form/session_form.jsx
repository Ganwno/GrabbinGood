import React from 'react';
import './session_style.css';
import {Redirect, Link} from 'react-router-dom';


class SessionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.demoHandleSubmit = this.demoHandleSubmit.bind(this);
       
    }

    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = Object.assign({}, this.state)
        this.props.showStocks().then(() => this.props.processForm(user))
        
    }

    renderErrors(){
        return(
            <ul className="errors">
                {this.props.errors.map((error, idx) => (
                    <li key={idx}>
                        {error}
                    </li>
                ))}
            </ul>
        )
    }

    demoHandleSubmit(e) {
        e.preventDefault();
        this.props.showStocks().then(() => this.props.processForm({ username: "demouser", password: "password123" }))
       
    }

    render(){
        if (this.props.formType === 'Login') {
        return(
            <div className = "user-page">
                <img src="/images/stock.jpeg" alt="" className = "image"></img>
                <form onSubmit= {this.handleSubmit} className ="whole-thing" >
                    <br/>
                   <h1 className="title">
                    Welcome to GrabbinGood
                    </h1>
                    <div className = "login-form">
                        <br/>
                        <label>Username
                            
                            <p>
                            <input type = "text" value = {this.state.username}
                            onChange = {this.update('username')} 
                            className = "login-input"
                            />
                            </p>
                        </label>
                        <br/>
                        <label>Password
                            <br/>
                            <p>
                            <input type = "password" value={this.state.password}
                            onChange={this.update('password')} 
                            className = "login-input"
                            />
                            </p>
                        </label>
                        <br/>
                        {this.renderErrors()}
                        <div className = "buttons">
                        
                        <input type = "submit" value = {this.props.formType}
                        className = "hit-button"
                        />

                        
                        <button className="demo-button"
                            onClick={this.demoHandleSubmit}>Demo User</button>

                        </div>
                        
                    </div>
                    
                </form>
            </div>
        )}
        else {
            return (
                
                <div className = "user-page">
                <img src="/images/stock.jpeg" alt="" className = "image"></img>
                <form onSubmit= {this.handleSubmit} className ="whole-thing" >
                    <br/>
                   <h1 className="title">
                    Welcome to GrabbinGood
                    </h1>
                    <div className = "login-form">
                        <br/>
                        <label>Username
                            
                            <p>
                            <input type = "text" value = {this.state.username}
                            onChange = {this.update('username')} 
                            className = "login-input"
                            />
                            </p>
                        </label>
                        <br/>
                        <label>Password
                            <br/>
                            <p>
                            <input type = "password" value={this.state.password}
                            onChange={this.update('password')} 
                            className = "login-input"
                            />
                            </p>
                        </label>
                        <br/>
                            {this.renderErrors()}
                        <div className = "buttons">
                        <input type = "submit" value = {this.props.formType}
                        className = "hit-button"
                        />
                        </div>
                        
                    </div>
                    
                </form>
            </div>
            )
        }
    }
}

export default SessionForm;