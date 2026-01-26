import {
  getLocalStorage,
  setLocalStorage,
  updateCartCounter,
  loadHeaderFooter,
} from "./utils.mjs";

// Load header and footer
loadHeaderFooter();

// Initialize cart counter on page load
updateCartCounter();

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];

  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  renderCartTotal(cartItems);
}

function renderCartTotal(cartItems) {
  const cartFooter = document.querySelector(".cart-footer");
  const cartTotal = document.querySelector(".cart-total");

  if (!cartItems || cartItems.length === 0) {
    cartFooter.classList.add("hide");
    return;
  }

  const total = cartItems.reduce((sum, item) => {
    return sum + item.FinalPrice * item.quantity;
  }, 0);

  cartTotal.textContent = `Total: $${total.toFixed(2)}`;
  cartFooter.classList.remove("hide");
}

function cartItemTemplate(item) {
  return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${item.Image}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: ${item.quantity}</p>
    <p class="cart-card__id">
      <span class="remove-product" data-id="${item.Id}">X</span>
    </p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;
}

document.addEventListener("click", (event) => {
  if (event.target.matches(".remove-product")) {
    removeFromCart(event.target.dataset.id);
  }
});

function removeFromCart(productId) {
  console.log("product id :", productId);
  const cartItems = getLocalStorage("so-cart");
  if (!cartItems || !cartItems.length) return;

  const index = cartItems.findIndex((product) => product.Id === productId);

  if (index !== -1) {
    cartItems.splice(index, 1);
  }

  if (cartItems.length === 0) {
    localStorage.removeItem("so-cart");
  } else {
    setLocalStorage("so-cart", cartItems);
  }

  renderCartContents();
  updateCartCounter();
}

renderCartContents();
