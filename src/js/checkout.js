import CheckoutProcess from "./CheckoutProcess.mjs";
import { loadHeaderFooter, updateCartCounter } from "./utils.mjs";

loadHeaderFooter().then(() => {
  updateCartCounter();

  const checkout = new CheckoutProcess("so-cart", ".checkout-summary");
  checkout.init();

  const form = document.getElementById("myform");
  if (form) {
    checkout.addSubmitHandler(form);
  }
});
