import { loadHeaderFooter } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { renderListWithTemplate, updateCartCounter } from "./utils.mjs";
import { productCardTemplate } from "./product-card-temp.mjs";
import Alert from "./Alert.js";

// Load header and footer, then update cart counter
loadHeaderFooter().then(() => {
  updateCartCounter();
});

// Create product data instance for tents
const externalServices = new ExternalServices("tents");

// Fetch and render products
externalServices.getData().then((products) => {
  // Take first 4 products from tents for Top Products
  const topProducts = products.slice(0, 4);
  renderListWithTemplate(
    productCardTemplate,
    document.querySelector(".product-list"),
    topProducts,
    "beforeend",
    true,
  );
});

// Create and generate alert
const a = new Alert(
  document.getElementById("atemp"),
  document.getElementById("alertHolder"),
);

// Generate the alert
a.generateAlert();
