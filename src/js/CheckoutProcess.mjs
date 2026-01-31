import { getLocalStorage, updateCartCounter } from "./utils.mjs";

function cartItemTemplate(item) {
  const qty = item.quantity || 1;
  return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${item.Image}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: ${qty}</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;
}

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = getLocalStorage(this.key) || [];
  }

  init() {
    this.renderOrderSummary();
    this.attachValidation();
  }

  attachValidation() {
    const zip = document.querySelector("#zip");
    const state = document.querySelector("#state");
    if (zip) {
      zip.addEventListener("change", () => this.checkZip());
    }
    if (state) {
      state.addEventListener("change", () => this.checkState());
    }
  }

  renderOrderSummary() {
    const parentElement = document.querySelector(this.outputSelector);
    if (!parentElement) return;

    const htmlItems = this.list.map((item) => cartItemTemplate(item));
    parentElement.innerHTML = htmlItems.join("");
    this.renderTotals();
  }

  renderTotals() {
    const subtotal = this.list.reduce(
      (sum, item) => sum + item.FinalPrice * (item.quantity || 1),
      0,
    );
    const shipping = subtotal > 0 ? 10 : 0;
    const tax = subtotal * 0.06;
    const orderTotal = subtotal + shipping + tax;

    this.updateDisplay("#subtotal", subtotal);
    this.updateDisplay("#shipping", shipping);
    this.updateDisplay("#tax", tax);
    this.updateDisplay("#order-total", orderTotal);
  }

  updateDisplay(selector, value) {
    const target = document.querySelector(selector);
    if (target) target.textContent = `$${value.toFixed(2)}`;
  }

  checkZip() {
    const zipInput = document.querySelector("#zip");
    if (!zipInput) return false;
    const isValid = /^\d{5}$/.test(zipInput.value.trim());
    this.toggleFieldError(zipInput, isValid);
    return isValid;
  }

  checkState() {
    const stateInput = document.querySelector("#state");
    if (!stateInput) return false;
    const isValid = stateInput.value.trim().length === 2;
    this.toggleFieldError(stateInput, isValid);
    return isValid;
  }

  toggleFieldError(inputEl, isValid) {
    const message = inputEl.nextElementSibling;
    if (message) {
      message.classList.toggle("hide", isValid);
    }
  }

  checkout(form) {
    const formElement = form || document.forms["checkout"];
    if (!formElement) return;

    const zipOk = this.checkZip();
    const stateOk = this.checkState();

    const formData = new FormData(formElement);
    const entries = Object.fromEntries(formData.entries());
    const hasAllValues = Object.values(entries).every((value) => value && value.trim().length);

    const allGood = zipOk && stateOk && hasAllValues;
    const errorBox = document.querySelector(".checkout-error");
    if (!allGood) {
      if (errorBox) errorBox.classList.remove("hide");
      return;
    }

    if (errorBox) errorBox.classList.add("hide");

    console.log("Order details", entries);

    // Clear cart and update UI
    localStorage.removeItem(this.key);
    updateCartCounter();
    this.list = [];
    this.renderOrderSummary();
    formElement.reset();
  }
}
