import React, { Component } from 'react'
import './index.css';
import images from '../Themes/Images';

export default class NavBar extends Component {
    render() {
        return (
            <div className="container center">
            <nav className="menu">
                <h1 style= {{
                    backgroundImage: `url(${images.logo})`
                }} className="menu__logo">Epic Co.</h1>
                <div className="menu__right">
                    <ul className="menu__list">
                        <li className="menu__list-item"><a className="menu__link menu__link--active" href="/">Home</a></li>
                        <li className="menu__list-item"><a className="menu__link" href="/aboutus">Coockie</a></li>
                        <li className="menu__list-item"><a className="menu__link" href="/privacy">Privacy</a></li>
                        <li className="menu__list-item"><a className="menu__link" href="/term">Term</a></li>
                    </ul>
    
                    <button style={{
                        backgroundImage: `url(${images.ic_menu})`
                    }}
                     className="menu__search-button"></button>
    
                    <form className="menu__search-form hide" method="POST">
                        <input className="menu__search-input" placeholder="Type and hit enter"/>
                    </form>
                </div>
            </nav>
        </div>
                
            
        )
    }
}
