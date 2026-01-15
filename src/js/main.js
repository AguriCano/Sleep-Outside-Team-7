import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { renderListWithTemplate } from "./utils.mjs";
import { productCardTemplate } from "./product-card-temp.mjs";


// Initialize data source and product list
const productData = new ProductData("tents");
// Product list instance
const productList = new ProductList("tents", productData, document.querySelector(".product-list"));
// Render product list
renderListWithTemplate(productCardTemplate, document.querySelector(".product-list"), await productList.init(), "beforeend", true);




