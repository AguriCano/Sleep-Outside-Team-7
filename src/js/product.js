import { getParams, getLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

// Function to update cart counter
function updateCartCounter() {
  const cartItems = getLocalStorage("so-cart") || [];
  const cartCount = cartItems.length;
  const cartCountElement = document.getElementById("cart-count");
  
  if (cartCountElement) {
    cartCountElement.textContent = cartCount;
    cartCountElement.style.display = cartCount > 0 ? "flex" : "none";
  }
}

// Initialize cart counter on page load
updateCartCounter();

const dataSource = new ProductData("tents");
const productId = getParams(window.location.search);
const productDetails = new ProductDetails(productId, dataSource);
productDetails.init();

// add listener to Add to Cart button

