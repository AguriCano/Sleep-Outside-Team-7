import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  // setLocalStorage("so-cart", product)
  // TODO

  const isEmpty = getLocalStorage("so-cart") || [];

  if (isEmpty < 1) {
    setLocalStorage("so-cart", product);
  }

  setLocalStorage("so-cart", [...isEmpty, product]);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
