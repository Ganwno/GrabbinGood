import React from 'react';
import './session_style.css';

class SessionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = Object.assign({}, this.state)
        this.props.processForm(user)
    }

    renderErrors(){
        return(
            <ul>
                {this.props.errors.map((error, i) => (
                    <li key={`error-${i}`}>
                        {error}
                    </li>
                ))}
            </ul>
        );
    }

    render(){
        return(
            <div>
                <form onSubmit= {this.handleSubmit}>
                    <br/>
                   <h1 className="userpage">
                    Welcome to GrabbinGood
                    </h1>
                    {this.renderErrors()}
                    <div className = "login-form">
                        <br/>
                        <label>Username
                            <br/>
                            <input type = "text" value = {this.state.username}
                            onChange = {this.update('username')} 
                            className = "login-input"
                            />
                        </label>
                        <br/>
                        <label>Password
                            <br/>
                            <input type = "password" value={this.state.password}
                            onChange={this.update('password')} 
                            className = "login-input"
                            />
                        </label>
                        <br/>
                    
                        <input type = "submit" value = {this.props.formType}
                        className = "hit-button"
                        />
                        
                    </div>


                </form>
            </div>
        )
    }
}

export default SessionForm;