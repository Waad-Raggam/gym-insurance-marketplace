import React, { useEffect, useState } from "react";
import { getCart, removeFromCart, clearCart } from "../../utils/cart/Cart";
import { Card, CardContent, Typography, Button } from "@mui/material";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    setCartItems(getCart());
  }, []);

  const handleRemove = (index) => {
    removeFromCart(index);
    setCartItems(getCart());
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
      <Button variant="contained" color="primary" onClick={handleClearCart}>
        Clear Cart
      </Button>
    </div>
  );
}
