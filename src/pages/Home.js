import React from "react";
import { Link } from "react-router-dom";
import Facebook from '../component/Facebook'
export default function Home() {
  return (
    <>
    <div className="App">
      <header className="App-header">
       <p>Welcome to Poohh</p>
       <Facebook></Facebook>
       <Link to="/profile"> Go to profile</Link>
       <Link to="/chat"> Чатлах</Link>
      </header>
    </div>
    </>
  );
}
