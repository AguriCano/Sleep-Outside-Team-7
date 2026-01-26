import { getLocalStorage, setLocalStorage, updateCartCounter } from "./utils.mjs";

// Template for cart item
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

export default class ShoppingCart {
  constructor(element) {
    this.element = element;
    this.setupEventListeners();
  }

  getCartItems() {
    return getLocalStorage("so-cart") || [];
  }

  renderCartContents() {
    const cartItems = this.getCartItems();
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    this.element.innerHTML = htmlItems.join("");
    this.renderCartTotal(cartItems);
  }

  renderCartTotal(cartItems) {
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

  removeFromCart(productId) {
    const cartItems = this.getCartItems();
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

    this.renderCartContents();
    updateCartCounter();
  }

  setupEventListeners() {
    document.addEventListener("click", (event) => {
      if (event.target.matches(".remove-product")) {
        this.removeFromCart(event.target.dataset.id);
      }
    });
  }
}
