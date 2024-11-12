import React, { useEffect, useState } from "react";
import { getCart, removeFromCart, clearCart } from "../../utils/cart/Cart";
import { Card, CardContent, Typography, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

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
    clearCart();
    setCartItems([]);
    navigate("/orders")
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
