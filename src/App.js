import React, { useEffect, useState } from "react";
import NavBar from "./components/navbar/NavBar";
import Home from "./components/home/Home";
import "./App.css";
import MainContent from "./components/main/MainContent";
import Footer from "./components/footer/Footer";
import InsurancePlans from "./components/products/InsurancePlans";
import axios from 'axios';
import Layout from "./components/layout/Layout";
import IndividualPlan from "./components/products/IndividualPlan";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserRegistration from "./components/user/UserRegistration";
import UserLogin from "./components/user/UserLogin";

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

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {index: true, element:<Home/>},
        {
          path: "/home",
          element: <Home />,
        },
        {
          path: "plans",
          element:  <InsurancePlans
          response = {response}
        />
        }, 
        {
          path: "plans/:planId",
          element: <IndividualPlan />,
        },
        {
          path: "/register",
          element: <UserRegistration />,
        },
        {
          path: "/login",
          element: <UserLogin />,
        },
        // {
        //   path: "products/:productId",
        //   element: <SingleProduct />,
        // },
        // {
        //   path: "/wishlist",
        //   element: <WishListPage wishList={wishList} />, 
        // },
        // {
        //   path: "*",
        //   element: <NotFoundPage/>,
        // },
      ]
    },
    
  ]);
  return <RouterProvider router={router} />;

  // return (
  //   <div className="App">
  //     <NavBar />
  //     <Home />
  //     <MainContent />
  //     <InsurancePlans response = {response}/>
  //     <Footer/>
  //   </div>
  // );
}

export default App;