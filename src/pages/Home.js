import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
    <div className="App">
      <header className="App-header">
       <p>Welcome to Poohh</p>
       <Link to="/profile"> Go to profile</Link>
      </header>
    </div>
    </>
  );
}
