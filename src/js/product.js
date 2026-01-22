import { getParams, updateCartCounter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";
import loadHeaderFooter from "./utils.mjs";

// Load header and footer
//loadHeaderFooter();

// Initialize cart counter on page load
updateCartCounter();

const dataSource = new ProductData("tents");
const productId = getParams(window.location.search);
const productDetails = new ProductDetails(productId, dataSource);
productDetails.init();

// add listener to Add to Cart button

