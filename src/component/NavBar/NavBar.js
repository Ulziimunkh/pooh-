import React, { Component } from 'react'
import './index.css';
import logo from './logo48x48.png'
import MenuIcon from '@material-ui/icons/Menu';
import images from '../Themes/Images';
import {Link} from 'react-router-dom'
import logo2 from './logo48x48.png';
console.log(logo2); 
export default class NavBar extends Component { 
    state={
    isOpen:false
}
handleToggle = () => {
    this.setState({isOpen:!this.state.isOpen})
}
    render() {
        return (
            <div class="header">
            <a href="#default" class="logo"><img src={logo2} alt="Logo" /></a>
            <div class="header-right">
              <a class="active" href="#home">Home</a>
              <a href="#contact">Contact</a>
              <a href="#about">About</a>
            </div>
          </div>
       
          
        )
    }
}
