import React from 'react';
import './App.css';
import { Route, Switch } from "react-router-dom";
import Profile from "./pages/Profile";
import Chat from "./pages/Chat";
import Home from "./pages/Home";
import Error from "./pages/Error";

function App() {
  return (
    <>
    <Switch>
    <Route path="/" exact component = {Home}></Route>
    <Route path="/profile" exact  component = {Profile}></Route>
    <Route path="/chat" exact  component = {Chat}></Route>
    <Route component={Error}></Route>
    </Switch>
    </>
  );
}

export default App;
