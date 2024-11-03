import React from "react";
import NavBar from "./components/navbar/NavBar";
import Home from "./components/home/Home";
import "./App.css";
import MainContent from "./components/main/MainContent";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Home/>
      <MainContent />
    </div>
  );
}

export default App;
