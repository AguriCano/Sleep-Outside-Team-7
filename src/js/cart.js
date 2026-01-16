import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];

  // render cart items
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  // NEW: render cart total
  renderCartTotal(cartItems);
}

function renderCartTotal(cartItems) {
  const cartFooter = document.querySelector(".cart-footer");
  const cartTotal = document.querySelector(".cart-total");

  // hide if cart is empty
  if (!cartItems || cartItems.length === 0) {
    cartFooter.classList.add("hide");
    return;
  }

  // calculate total
  const total = cartItems.reduce((sum, item) => {
    return sum + item.FinalPrice;
  }, 0);

  // display total
  cartTotal.textContent = `Total: $${total.toFixed(2)}`;
  cartFooter.classList.remove("hide");
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${item.Image}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;

  return newItem;
}

renderCartContents();
