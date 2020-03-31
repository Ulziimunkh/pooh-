import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './App.css';
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Error from "./pages/Error";
import Login from "./component/Login/login";
import Signup from "./component/Signup/Signup";

import * as serviceWorker from './serviceWorker';
import Dashboard from './component/Dashboard/Dashboard';
import i18n from './localization/i18n'
import { I18nextProvider } from "react-i18next";
import   Aboutus from './component/Weare/About';
import   Privacy from './component/Weare/Privacy';
import  Term from './component/Weare/Term';

// routing
const routing = (

  <I18nextProvider i18n={i18n}>
  <Router>
    <div id='routing-container'>
      <Switch>
        <Route path="/" exact component = {Home}></Route>
        <Route path="/signup" exact component = {Signup}></Route>
        <Route path="/login" exact component = {Login}></Route>
        <Route path="/profile" exact  component = {Profile}></Route>
        <Route path="/dashboard" exact  component = {Dashboard}></Route>
        <Route path="/aboutus" exact  component = {Aboutus}></Route>
        <Route path="/term" exact  component = {Term}></Route>
        <Route path="/privacy" exact  component = {Privacy}></Route>
        <Route component={Error}></Route>

      </Switch>
    </div>
  </Router>
  </I18nextProvider>
);
ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
