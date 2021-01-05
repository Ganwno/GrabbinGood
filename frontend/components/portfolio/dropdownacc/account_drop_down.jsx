import React from 'react';
import {Link} from 'react-router-dom'
import './drop_down.css'

class AccountDropDown extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dropDown: false,
            count: 1
        }
        this.extendDropDown = this.extendDropDown.bind(this)
        this.closeMenu = this.closeMenu.bind(this);
    }

    extendDropDown(e) {
        e.preventDefault();
        if (this.state.dropDown === false && this.state.count % 2 !== 0) {
           let newCount = this.state.count + 1
        this.setState({
            dropDown: true,
            count: newCount
        }, () => {
            document.addEventListener('mousedown', this.closeMenu);
        })
        }
        else if (this.state.count % 2 === 0) {
            let newCount2 = this.state.count + 1
            this.setState({ dropDown: false, count: newCount2 }, () => {
                document.removeEventListener('mousedown', this.closeMenu);
            });
        }
    }

    closeMenu(e) {
        if (!this.buttonRef.contains(e.target) && !this.logoutbutton.contains(e.target)) {
            let newCount2 = this.state.count + 1
        this.setState({ dropDown: false, count: newCount2 }, () => {
            document.removeEventListener('mousedown', this.closeMenu);
        });
    }
    }

    render() {
        let accBal = parseFloat(this.props.accountBalance).toFixed(2)
        return(
            <div className = "right-nav">
                <a href="https://www.linkedin.com/in/christopher-lee-7b48b6134/" className= "linkedin-img-container">
                <img src="/images/linkedin.svg" alt="" className="linkedin-image"></img>
                </a>
                <a href="https://github.com/Gogetaspirit/GrabbinGood" className = "github-img-container">
                <img src="/images/github.png" alt="" className="github-image"></img>
                </a>
                <div className = 'drop-log-out'>
                <button className = 'account-dd-button'onClick={this.extendDropDown} ref={(ele) =>{
                    this.buttonRef = ele
                }}>
                    Account
                </button>
                {this.state.dropDown ? (
                <div className="dropdown-for-acc">
                    <div className="dropdown-username">{this.props.username}</div>
                    <div className="accbal-for-dropdown">${accBal} Buying Power</div>  
                    <button onClick={this.props.logout} className='logout-button-for-nav' ref={(ele2) =>{this.logoutbutton = ele2}}>
                    <img src ="/images/logout.png" alt ="" className="logout-img-for-dropdown"></img>
                    <div className="text-for-dropdown-logout">
                    Log Out
                    </div>
                    </button>
                </div>
                ) : 
                ( null)
                }
                </div>
            </div>
            
        )
    }
}

export default AccountDropDown;