import React, { useEffect, useState } from "react";
import { getCart, removeFromCart, clearCart } from "../../utils/cart/Cart";
import { Card, CardContent, Typography, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  // const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    setCartItems(getCart());
  }, []);

  // const calculateTotal = (items) => {
  //   const total = items.reduce((acc, item) => acc + item.price, 0);
  //   setTotalAmount(total);
  // };

  const handleRemove = (index) => {
    removeFromCart(index);
    setCartItems(getCart());
  };

  const handleCheckout = () => {
    const orderData = {
      gymId: "d88f8ab9-8fb7-4bc9-852a-643204a310b0",
      insuranceId: 2,
      startDate: "2024-11-02T06:46:25.075Z",
      endDate: "2024-11-02T06:46:25.075Z",
      premiumAmount: 0,
      isActive: true,
    };

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

        if (error.response && error.response.status === 400) {
          const { errors } = error.response.data;
          if (errors.Name) alert(errors.Name[0]);
          if (errors.Email) alert(errors.Email[0]);
          if (errors.Password) alert(errors.Password[0]);
          if (errors.PhoneNumber) alert(errors.PhoneNumber[0]);
        }
      });
  };

  const handleClearCart = () => {
    clearCart();
    setCartItems([]);
  };

  return (
    <div>
      <h2>Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cartItems.map((item, index) => (
          <Card key={index} sx={{ maxWidth: 345, margin: "16px" }}>
            <CardContent>
              <Typography variant="h6">{item.planName}</Typography>
              <Typography variant="body2" color="text.secondary">
                {item.coverageType}
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
      {/* <Typography variant="h6">Total: ${totalAmount}</Typography> */}
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
