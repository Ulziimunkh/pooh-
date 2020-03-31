import React from "react";
import AuthProvider from "../component/Login/AuthProvider";
export default function Home() {
  return (
    <>
    <div className="App">
       <AuthProvider/>
    </div>
    </>
  );
}
