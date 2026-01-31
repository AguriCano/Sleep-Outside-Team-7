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
    this.list = [];
    this.itemTotal = 0;
    this.orderTotal = 0;
  }

  init() {
    this.list = getLocalStorage(this.key) || [];
    this.renderItemList();
    this.calculateItemSummary();
    this.setTaxZipListener();
  }

  renderItemList() {
    const parentElement = document.querySelector(this.outputSelector);
    if (!parentElement) return;
    const htmlItems = this.list.map((item) => cartItemTemplate(item));
    parentElement.innerHTML = htmlItems.join("");
  }

  calculateItemSummary() {
    this.itemTotal = this.list.reduce(
      (sum, item) => sum + item.FinalPrice * (item.quantity || 1),
      0,
    );
    const shipping = this.calculateShipping();
    const tax = this.calculateTax(this.itemTotal);
    this.orderTotal = this.itemTotal + shipping + tax;

    this.updateTotalsDisplay({
      subtotal: this.itemTotal,
      shipping,
      tax,
      orderTotal: this.orderTotal,
    });
  }

  calculateShipping() {
    return this.itemTotal > 0 ? 10 : 0;
  }

  calculateTax(subtotal) {
    return subtotal * 0.06;
  }

  updateTotalsDisplay(totals) {
    this.updateDisplay("#subtotal", totals.subtotal);
    this.updateDisplay("#shipping", totals.shipping);
    this.updateDisplay("#tax", totals.tax);
    this.updateDisplay("#order-total", totals.orderTotal);
  }

  updateDisplay(selector, value) {
    const target = document.querySelector(selector);
    if (target) target.textContent = `$${value.toFixed(2)}`;
  }

  setTaxZipListener() {
    const zip = document.querySelector("#zip");
    if (!zip) return;
    zip.addEventListener("change", () => {
      this.checkZip();
      this.calculateItemSummary();
    });
  }

  addSubmitHandler(form) {
    const errorBox = document.querySelector(".checkout-error");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const zipValid = this.checkZip();
      const stateValid = this.checkState();
      const formValues = this.serializeForm(form);
      const hasAllValues = Object.values(formValues).every(
        (value) => value && value.trim().length,
      );

      if (!zipValid || !stateValid || !hasAllValues) {
        if (errorBox) errorBox.classList.remove("hide");
        return;
      }

      if (errorBox) errorBox.classList.add("hide");
      console.log("Order details", formValues);

      localStorage.removeItem(this.key);
      updateCartCounter();
      this.list = [];
      this.renderItemList();
      this.calculateItemSummary();
      form.reset();
    });
  }

  serializeForm(form) {
    const formData = new FormData(form);
    return Object.fromEntries(formData.entries());
  }

  checkZip() {
    const zipInput = document.querySelector("#zip");
    if (!zipInput) return false;
    const isValid = /^\\d{5}$/.test(zipInput.value.trim());
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
}
