function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  constructor(category) {
    this.category = category;
    this.path = `../json/${this.category}.json`;
    }
    
    // Fetch all product data
    init() { 

    }

    addProductToCart() {
          const cartItems = getLocalStorage("so-cart") || []; // get cart array of items from local storage if null set to empty array
          cartItems.push(product);
          setLocalStorage("so-cart", cartItems);
    }

    renderProductDetails() { 

    }
}