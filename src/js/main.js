import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { renderListWithTemplate } from "./utils.mjs";
import { productCardTemplate } from "./product-card-temp.mjs";

const productData = new ProductData("tents");
const productList = new ProductList("tents", productData, document.querySelector(".product-list"));

renderListWithTemplate(productCardTemplate, document.querySelector(".product-list"), await productList.init(), "beforeend", true);


console.log(await productList.init());
