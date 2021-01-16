import React from 'react';
import {Link} from 'react-router-dom';
import './greeting_style.css';
import PortfolioContainer from '../portfolio/portfolio_container';

const Greeting = ({currentUser, logout}) => {
        return(
        <div className = 'front-page'>
        <nav className= "header">
            <div>
            <h1 className="header-left" >GrabbinGood 
            <img src="/images/logo.jpeg" alt="" className="logo-image"></img>
            </h1>
            </div>
            <div className = "header-right">
            <Link to = "/login"><button className = 'login-button'>Log In</button></Link>
            &nbsp;&nbsp;
            <Link to="/signup"><button className = 'signup-button'>Sign Up</button></Link>
            </div>
        </nav>
            <div className='caption'>
                <div className = 'subcaption'>
                    <h1 className="caption-header">Investing for <br></br> Everyone</h1>
                <p className = "words">GrabbinGood, the best way to invest, <br></br>gives you more ways to earn money 
                while<br></br>being free and easy to use.</p>
                <br/>
                <Link to="/signup"><button className='second-signup-button'>Sign Up</button></Link>
                </div>
                {/* <img className = "caption-image"src="/images/homepage.jpeg" alt=""></img> */}
                    <img className = "caption-image" src="https://media.giphy.com/media/mMwer72fBJfMyLVL9P/giphy.gif" />
            </div>
            <div className = "white-bottom">
                <div className= "footer">
                <h2>The Best Robinhood Clone</h2>
                    <p>GrabbinGood is the greatest Robinhood clone on the market. This application is profit free and </p>
                        <p> was made in order to show off my technical capacity. There is no influx of cash being generated.
                    </p>
                    <p className='second-p'>In order to see more of my work, be sure to check out my socials down below.</p>
                        <div className="greeting-sociallinks">
                            <div>
                            <a href='https://github.com/clee1996/GrabbinGood' target="_blank"><img className="greeting-github" src='/images/github.png'></img></a>
                            <div>Github</div>
                            </div>
                            <div>
                            <a href='https://www.linkedin.com/in/christopher-lee-7b48b6134/' target="_blank"><img className="greeting-linkedin" src='/images/linkedin.svg'></img></a>
                            <div>Linkedin</div>
                            </div>
                            <div>
                            <a href="https://clee1996.github.io/" target="_blank"><img src="/images/portfolio.png" alt="" className="profile-greeting"></img></a>
                            <div>Personal</div>
                            </div>
                            <div>
                                <a href="https://angel.co/u/christopher-lee-133" target="_blank"><img src="/images/angellist.png" alt="" className="greeting-angellist"></img></a>
                                <div>Angellist</div>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default Greeting;

