import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { renderListWithTemplate, getLocalStorage } from "./utils.mjs";
import { productCardTemplate } from "./product-card-temp.mjs";

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

const productData = new ProductData("tents");
const productList = new ProductList("tents", productData, document.querySelector(".product-list"));

productList.init().then(products => {
  renderListWithTemplate(productCardTemplate, document.querySelector(".product-list"), products, "beforeend", true);
})







