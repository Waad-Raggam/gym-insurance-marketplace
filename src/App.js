import React, { useEffect, useState } from "react";
import NavBar from "./components/navbar/NavBar";
import Home from "./components/home/Home";
import "./App.css";
import MainContent from "./components/main/MainContent";
import Footer from "./components/footer/Footer";
import InsurancePlans from "./components/products/InsurancePlans";
import axios from 'axios';

function App() {
  const url = "http://localhost:5125/api/v1/InsurancePlan/"

  const[response, setResponse ] = useState("");


  function getDataFromServer() {
    axios.get(url)
    .then((response) => {
      console.log(response.data);
      setResponse(response.data);
    }) 
    .catch((error)=>{
      console.log("error " + error)
    });
  }

  useEffect(()=>{
    getDataFromServer();
  }, []);
  return (
    <div className="App">
      <NavBar />
      <Home />
      <MainContent />
      <InsurancePlans response = {response}/>
      <Footer/>
    </div>
  );
}

export default App;
