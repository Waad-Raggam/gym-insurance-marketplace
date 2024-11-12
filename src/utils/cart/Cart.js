export const addToCart = (product, index) => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));

  console.log("Current cart contents:", JSON.parse(localStorage.getItem("cart")));
};

export const logCartInfo = () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  console.log("Cart contents:", cart);
};

  
  export const getCart = () => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  };
  
  export const removeFromCart = (index) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (index >= 0 && index < cart.length) {
      cart.splice(index, 1); 
      localStorage.setItem("cart", JSON.stringify(cart)); 
      console.log("Removed item at index ${index}");
    } else {
      console.log("Invalid index");
    }
    logCartInfo(); 
  };
  
  
  export const clearCart = () => {
    localStorage.removeItem("cart");
  };
  