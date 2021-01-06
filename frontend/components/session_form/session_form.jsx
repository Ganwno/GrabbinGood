import React from 'react';
import './session_style.css';
import {FiAlertCircle} from 'react-icons/fi'
import {Redirect, Link} from 'react-router-dom';


class SessionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userlogininfo: {
            username: "",
            password: ""
            },
            usersignupinfo: {
                username: "",
                password: "",
                account_balance: 60000
            }
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.demoHandleSubmit = this.demoHandleSubmit.bind(this);
       
    }

    update(field) {
        if (this.props.formType === 'Login') {
        return e => this.setState({
            userlogininfo: { ...this.state.userlogininfo,
            [field]: e.currentTarget.value}
        })
        }
        else {
            return e => this.setState({
                usersignupinfo: {
                    ...this.state.usersignupinfo,
                    [field]: e.currentTarget.value
                }
            })
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        if (this.props.formType === 'Login') {
        const user = Object.assign({}, this.state.userlogininfo)
        this.props.showStocks().then(() => this.props.processForm(user))
        }
        else {
            const user2 = Object.assign({}, this.state.usersignupinfo)
            this.props.showStocks().then(() => this.props.processForm(user2))
        }
        
    }

    renderErrors(){
        return(
            <ul className="errors">
                {this.props.errors.map((error, idx) => (
                    <li key={idx} className="errors-list">
                        <FiAlertCircle/> {error}
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
                        <label className="username-pass-for-form">Username
                            
                            <p>
                            <input type = "text" value = {this.state.username}
                            onChange = {this.update('username')} 
                            className = "login-input"
                            />
                            </p>
                        </label>
                        <br/>
                        <label className="username-pass-for-form">Password
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
                            <label className="username-pass-for-form" >Username
                            
                            <p>
                            <input type = "text" value = {this.state.username}
                            onChange = {this.update('username')} 
                            className = "login-input"
                            />
                            </p>
                        </label>
                        <br/>
                            <label className="username-pass-for-form" >Password
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