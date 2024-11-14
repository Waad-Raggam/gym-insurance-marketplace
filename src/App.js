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
import Cart from "./components/cart/Cart";
import Orders from "./components/orders/Orders";
import GymForm from "./components/form/GymForm";
import InsurancePlanForm from "./components/form/InsurancePlanForm";
import EditPlanForm from "./components/form/EditPlanForm";

function App() {
  const [response, setResponse] = useState("");
  const [userData, setUserData] = useState(null);
  const [isUserDataLoading, setIsUserDataLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [gyms, setGyms] = useState([]);
  const [isGymsLoading, setIsGymsLoading] = useState(true);

  const productUrl = "https://gym-insurance-marketplace-backend.onrender.com/api/v1/InsurancePlan/";
  const profileUrl = "https://gym-insurance-marketplace-backend.onrender.com/api/v1/User/Profile/";
  const gymsUrl = "https://gym-insurance-marketplace-backend.onrender.com/api/v1/Gym/";

  useEffect(() => {
    getDataFromServer();
    getUserData();
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
    getGymsData();
  }, []);

  function getDataFromServer() {
    axios
      .get(productUrl)
      .then((response) => setResponse(response.data))
      .catch((error) => console.log("Error: ", error));
  }

  function getGymsData() {
    axios
      .get(gymsUrl)
      .then((response) => setGyms(response.data))
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
        console.log("Token :", token);
        setUserData(response.data);
        setIsUserDataLoading(false);
      })
      .catch((error) => {
        setIsUserDataLoading(false);
        console.log("Error: ", error);
      });
  }

  useEffect(() => {
    const fetchUserGyms = async () => {
      if (userData?.userId && userData.role === "Customer") {
        setIsGymsLoading(true);
        const token = localStorage.getItem("token");
        const gymsUrl = `https://gym-insurance-marketplace-backend.onrender.com/api/v1/Gym/user/${userData.userId}`;

        try {
          const gymsResponse = await axios.get(gymsUrl, {
            headers: { Authorization: `Bearer ${token}` },
          });
          console.log("api :", gymsUrl);
          console.log("User gyms :", gymsResponse.data);
          setGyms(gymsResponse.data);
        } catch (error) {
          console.error("Error fetching gyms:", error);
        } finally {
          setIsGymsLoading(false);
        }
      }
    };

    fetchUserGyms();
  }, [userData]);

  const isAuthenticatedUser = Boolean(
    userData && localStorage.getItem("token")
  );
  const isAdmin = userData?.role === "Admin";

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Layout
          isAuthenticated={isAuthenticatedUser}
          userData={userData}
          setIsAuthenticated={setIsAuthenticated}
        />
      ),
      children: [
        { index: true, element: <Home /> },
        { path: "plans/:planId", element: <IndividualPlan /> },
        { path: "register", element: <UserRegistration /> },
        { path: "login", element: <UserLogin /> },
        {
          path: "profile",
          element: (
            <ProtectedRoute
              isUserDataLoading={isUserDataLoading}
              isAuthenticated={isAuthenticatedUser}
              element={<UserProfile userData={userData} userGyms={gyms} />}
            />
          ),
        },
        {
          path: "plans",
          element: <InsurancePlans response={response} userGyms={gyms} />,
        },
        // ...(isAdmin
        //   ? [
        {
          path: "dashboard",
          element: (
            <ProtectedRoute
              isUserDataLoading={isUserDataLoading}
              isAuthenticated={isAuthenticatedUser}
              isAdmin={isAdmin}
              requiresAdmin={true}
              element={<Dashboard productsData={response} gyms={gyms} />}
            />
          ),
        },
        {
          path: "/gymForm",
          element: <GymForm userData={userData} />,
        },
        {
          path: "/plansForm",
          element: <InsurancePlanForm userData={userData} />,
        },
        {
          path: "/editPlan/:insuranceId",
          element: <EditPlanForm />,
        },
        {
          path: "/cart",
          element: <Cart userData={userData} gyms={gyms} response={response} />,
        },
        {
          path: "/orders",
          element: <Orders userData={userData} gyms={gyms} />,
        },
      ],
      // : []),
      // ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
