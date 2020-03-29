import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

export default class Profile  extends Component {
   // const {name, email, picture} = fb;
   render(){
        return (
            <>
            <div className="App">
              <header className="App-header">
                <h2>Welcome {this.props.location.state.name}</h2>
                <div
                style={{
                    width: "400px",
                    margin: "auto",
                    background: "#000",
                    padding: "20px"
                }}
                >
                <img src={this.props.location.state.picture} alt={this.props.location.state.name} />
                <h2>Welcome {this.props.location.state.name}</h2>
                Email: {this.props.location.state.email}
                </div>
                <Link to="/"> Go to Home</Link>
              </header>
            </div>
            </>
        )
            }
}

Profile.propTypes = {
    profile: PropTypes.shape({
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        picture: PropTypes.string.isRequired,
    })
}