import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import axios from "axios";
import Layout from "./components/layout/Layout";
import ProtectedRoute from "./components/user/ProtectedRoute";
import Home from "./components/home/Home";
import InsurancePlans from "./components/products/InsurancePlans";
import IndividualPlan from "./components/products/IndividualPlan";
import UserRegistration from "./components/user/UserRegistration";
import UserLogin from "./components/user/UserLogin";
import UserProfile from "./components/user/UserProfile";
import Dashboard from "./components/dashboard/dashboard";

function App() {
  const [response, setResponse] = useState("");
  const [userData, setUserData] = useState(null);
  const [isUserDataLoading, setIsUserDataLoading] = useState(true);

  const productUrl = "http://localhost:5125/api/v1/InsurancePlan/";
  const profileUrl = "http://localhost:5125/api/v1/User/Profile/";

  useEffect(() => {
    getDataFromServer();
    getUserData();
  }, []);

  function getDataFromServer() {
    axios
      .get(productUrl)
      .then((response) => setResponse(response.data))
      .catch((error) => console.log("Error: ", error));
  }

  function getUserData() {
    setIsUserDataLoading(true);
    const token = localStorage.getItem("token");
    if (!token) return setIsUserDataLoading(false);

    axios
      .get(profileUrl, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        console.log("User logged in:", response.data);
        setUserData(response.data);
        setIsUserDataLoading(false);
      })
      .catch((error) => {
        setIsUserDataLoading(false);
        console.log("Error: ", error);
      });
  }

  const isAuthenticatedUser = Boolean(
    userData && localStorage.getItem("token")
  );
  const isAdmin = userData?.role === "Admin";

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Layout isAuthenticated={isAuthenticatedUser} userData={userData} />
      ),
      children: [
        { index: true, element: <Home /> },
        { path: "plans", element: <InsurancePlans response={response} /> },
        { path: "plans/:planId", element: <IndividualPlan /> },
        { path: "/register", element: <UserRegistration /> },
        { path: "/login", element: <UserLogin /> },
        {
          path: "/profile",
          element: (
            <ProtectedRoute
              isUserDataLoading={isUserDataLoading}
              isAuthenticated={isAuthenticatedUser}
              element={<UserProfile userData={userData} />}
            />
          ),
        },
        {
          path: "/dashboard",
          element: (
            <ProtectedRoute
              isUserDataLoading={isUserDataLoading}
              isAuthenticated={isAuthenticatedUser}
              isAdmin={isAdmin}
              requiresAdmin={true}
              element={<Dashboard productsData={response} />}
            />
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
