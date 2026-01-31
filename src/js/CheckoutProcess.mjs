import { getLocalStorage, setLocalStorage, updateCartCounter } from "./utils.mjs";

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
    this.renderCartTotal(cartItems);
  }
  
  renderCartTotal(cartItems) {
    
    // Get the cart total element
    const cartTotal = document.querySelector(".cart-total");

    // Calculate total price
    const total = cartItems.reduce((sum, item) => {
        return sum + item.FinalPrice * item.quantity;
    }, 0);

    // Update the cart total display
    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
  
  }
}
