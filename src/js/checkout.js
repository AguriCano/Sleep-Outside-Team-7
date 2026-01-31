import CheckoutProcess from "./CheckoutProcess.mjs";
import { loadHeaderFooter, updateCartCounter } from "./utils.mjs";

loadHeaderFooter().then(() => {
  updateCartCounter();

  const checkout = new CheckoutProcess("so-cart", ".checkout-summary");
  checkout.init();

  const form = document.forms["checkout"];
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      checkout.checkout(form);
    });
  }
});
