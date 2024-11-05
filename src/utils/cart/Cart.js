export const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
  };
  
  export const getCart = () => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  };
  
  export const removeFromCart = (productId) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter((item) => item.id !== productId);
    localStorage.setItem("cart", JSON.stringify(cart));
  };
  
  export const clearCart = () => {
    localStorage.removeItem("cart");
  };
  