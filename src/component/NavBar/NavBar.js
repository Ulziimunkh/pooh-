import React, { Component } from "react";
import "./navbar.css";
import images from "../Themes/Images";
import classNames from "classnames";
import { NavLink, withRouter } from "react-router-dom";
import MenuRoundedIcon from "@material-ui/icons/MenuRounded";
import IconButton from '@material-ui/core/IconButton';

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isHome: false,
      isDropped: false
    };
  }
  toggleTopMenu = () => {
    this.setState({ isDropped: !this.state.isDropped });
  };
  componentDidMount() {
    console.log(
      "NavBar -> componentWillMount -> this.props.location.pathname ",
      this.props.location.pathname
    );
  }
  render() {
    let className = classNames({ header: true, home: this.state.isHome, 'responsive': this.state.isDropped });
    return (
        <nav className={className}>
          <a href="/" className="logo">
            <img src={images.logo} alt="Logo" />
            <span> Mango Chat</span>
          </a>
          <IconButton 
            edge="start" onClick={this.toggleTopMenu}
            className="menuButton"
            color="inherit"
            aria-label="open drawer"
          >
            <MenuRoundedIcon />
          </IconButton>
            <NavLink className="menu" to="/privacy" activeClassName="active">
              Privacy
            </NavLink>
            <NavLink className="menu" to="/term" activeClassName="active">
              Term
            </NavLink>
            <NavLink className="menu" exact activeClassName="active" to="/aboutus">
              About
            </NavLink>
            <NavLink className="menu" exact activeClassName="active" to="/">
              Home
            </NavLink>
        </nav>
    );
  }
}
export default withRouter(NavBar);
