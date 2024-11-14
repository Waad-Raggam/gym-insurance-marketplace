import React, { useEffect, useState } from "react";
import { getCart, removeFromCart, clearCart } from "../../utils/cart/Cart";
import { Card, CardContent, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Chip from "@mui/material/Chip";
import axios from "axios";

export default function Cart(props) {
  const { userData, gyms, response } = props;
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
    console.log(storedCart);
    console.log(gyms);
    console.log("resp " + response);
  }, []);

  const handleRemove = (index) => {
    removeFromCart(index);
    setCartItems(getCart());
  };

  const handleCheckout = () => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const gymInsuranceMap = {};

    storedCart.forEach((item) => {
      console.log("item gym " + item.gymId);
      console.log("item plan " + item.planId);
      console.log("userid " + userData.userId);

      item.gymId.forEach((gymId) => {
        if (!gymInsuranceMap[gymId]) {
          gymInsuranceMap[gymId] = [];
        }
        gymInsuranceMap[gymId].push(item.planId);
      });
    });

    for (const gymId in gymInsuranceMap) {
      const insuranceIds = gymInsuranceMap[gymId];
      const orderData = {
        gymId: gymId,
        userId: userData.userId,
        insuranceIds: insuranceIds,
        startDate: "2024-11-02T06:46:25.075Z",
        endDate: "2024-11-02T06:46:25.075Z",
        premiumAmount: 0,
        isActive: true,
      };

      console.log("orderData:", orderData);

      const orderUrl = "http://localhost:5125/api/v1/GymInsurance";
      axios
        .post(orderUrl, orderData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          console.log(response.data, "Order created successfully!");
          clearCart();
          setCartItems([]);
          navigate("/orders");
        })
        .catch((error) => {
          console.error("Error creating order:", error);
          if (error.response) {
            console.error("Response data:", error.response.data);
            console.error("Response status:", error.response.status);
            console.error("Response headers:", error.response.headers);
          } else if (error.request) {
            console.error("Request data:", error.request);
          } else {
            console.error("Error message:", error.message);
          }
        });
    }
  };

  const handleClearCart = () => {
    clearCart();
    setCartItems([]);
  };

  const getGymNames = (gymIds) => {
    console.log(gymIds);
    return gymIds.map(gymId => {
      const gym = gyms.find(gym => gym.gymId === gymId);
      return gym ? gym.gymName : "Gym not found";
    });
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + parseFloat(item.monthlyPremium) || 0; 
    }, 0).toFixed(2); };

  if (!cartItems) {
    return null;
  }

  return (
    <div>
      <h2>Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cartItems.map((item, index) => (
          <Card key={index} sx={{ maxWidth: 345, margin: "16px" }}>
            <CardContent>
              <Typography variant="h6" color="primary">{item.planName}</Typography>
              <Chip label={item.monthlyPremium} variant="outlined" color="primary" />
              <Typography variant="body2" color="secondary">
                {item.coverageType}
              </Typography>
              <Typography variant="body2">
                Coverage Details:
                <ul>
                  {Array.isArray(item.coverageDetails) ? (
                    item.coverageDetails.map((detail, index) => (
                      <li key={index}>{detail}</li>
                    ))
                  ) : (
                    <li>No coverage details available</li>
                  )}
                </ul>
              </Typography>
              <Typography variant="body2">
                Gyms to be insured:
                <ul>
                  {Array.isArray(item.gymId) ? (
                    getGymNames(item.gymId).map((gymName, index) => (
                      <li key={index}>{gymName}</li>
                    ))
                  ) : (
                    <li>No gym ID available</li>
                  )}
                </ul>
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleRemove(index)}
              >
                Remove
              </Button>
            </CardContent>
          </Card>
        ))
      )}

      <div style={{ marginTop: "16px" }}>
        <Typography variant="h6">Total: ${calculateTotal()}</Typography>
      </div>

      <Button variant="contained" color="primary" onClick={handleClearCart}>
        Clear Cart
      </Button>
      <Button
        variant="contained"
        color="primary"
        sx={{ marginLeft: "16px" }}
        onClick={handleCheckout}
      >
        Complete Checkout
      </Button>
    </div>
  );
}
