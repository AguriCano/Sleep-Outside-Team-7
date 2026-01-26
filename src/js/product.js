import { getParams, updateCartCounter, loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

// Load header and footer, then update cart counter
loadHeaderFooter().then(() => {
  updateCartCounter();
});

const dataSource = new ProductData("tents");
const productId = getParams(window.location.search);
const productDetails = new ProductDetails(productId, dataSource);
productDetails.init();

// add listener to Add to Cart button
