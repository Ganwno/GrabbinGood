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
        console.log(this.state.count)
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
        console.log(this.dropdownMenu)
        console.log(e.target)
        if (!this.buttonRef.contains(e.target)) {
            let newCount2 = this.state.count + 1
        this.setState({ dropDown: false, count: newCount2 }, () => {
            document.removeEventListener('mousedown', this.closeMenu);
        });
    }
    }

    render() {
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
                    <div className="menu" ref={(element) => {
                    this.dropdownMenu = element
                    }}>
                  <button onClick={this.props.logout} className='logout-button-for-nav'><img src ="/images/logout.png" alt ="" className="logout-img-for-dropdown">
                      </img>Log Out</button>
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