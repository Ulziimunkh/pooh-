import React from 'react';
import logo from './logo.svg';
import './App.css';
import Facebook from './component/Facebook';

function App() {
  return (
    <div className="App">
      <header className="App-header">
       <p>Facebook auth example </p>
       <Facebook></Facebook>
      </header>
    </div>
  );
}

export default App;
