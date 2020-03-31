import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import firebase from 'firebase'
export default class Profile  extends Component {
   // const {name, email, picture} = fb;
   render(){
        return (
            <>
            <div className="App">
              <header className="App-header">
              <div>
                    <h1>Pooh!</h1>
                    <img alt={firebase.auth().currentUser.displayName} src={firebase.auth().currentUser.photoURL} />
                    <p>
                    Welcome {firebase.auth().currentUser.displayName}! You are now
                    signed-in!
                    </p>
                    <button onClick={(e) => this.logout(e)}>Sign-out</button>
                </div>
                <Link to="/dashboard"> Go to Home</Link>
              </header>
            </div>
            </>
        )
            };
            
            logout = (e) => {
                e.preventDefault();
                firebase.auth().signOut();
                this.props.history.push('/');
            }
}

Profile.propTypes = {
    profile: PropTypes.shape({
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        picture: PropTypes.string.isRequired,
    })
}