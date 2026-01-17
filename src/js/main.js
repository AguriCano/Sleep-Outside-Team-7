import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { renderListWithTemplate, updateCartCounter } from "./utils.mjs";
import { productCardTemplate } from "./product-card-temp.mjs";

// Initialize cart counter on page load
updateCartCounter();

const productData = new ProductData("tents");
const productList = new ProductList("tents", productData, document.querySelector(".product-list"));

productList.init().then(products => {
  renderListWithTemplate(productCardTemplate, document.querySelector(".product-list"), products, "beforeend", true);
})







