import { loadHeaderFooter, updateCartCounter } from "./utils.mjs";
import ShoppingCart from "./CheckoutProcess.mjs";

// Load header and footer, then update cart counter and initialize cart
loadHeaderFooter().then(() => {
  updateCartCounter();
  
  // Initialize shopping cart
  const cartElement = document.querySelector(".product-list");
  const cart = new ShoppingCart(cartElement);
  cart.renderCartContents();
});
