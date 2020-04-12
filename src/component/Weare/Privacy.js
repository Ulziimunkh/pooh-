import React from 'react';
import NavBar from '../NavBar/NavBar';
import './About.css'
 export default class Aboutus extends React.Component {
  render() {
    return (
      <>
      <NavBar></NavBar>
      <div className="title">
    <h2> Coockie Policy</h2>
      </div>
      <div className="text">
    <h2>Introduction:</h2>
    <h3> At Tinder, your privacy is a top priority. Your privacy is at the core of the way we design and build the services and products you know and love, so that you can fully trust them and focus on building meaningful connections.

We appreciate that you put your trust in us when you provide us with your information and we do not take this lightly.</h3>
      </div>
      {/* <Footer></Footer> */}
    </>)
    
  }
}