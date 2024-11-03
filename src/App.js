import React from "react";
import NavBar from "./components/navbar/NavBar";
import Home from "./components/home/Home";
import "./App.css";
import MainContent from "./components/main/MainContent";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Home/>
      <MainContent />
      <Footer/>
    </div>
  );
}

export default App;
