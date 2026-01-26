import { getParams, updateCartCounter, loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

// Load header and footer, then update cart counter
loadHeaderFooter().then(() => {
  updateCartCounter();
});

const productId = getParams(window.location.search);

// Try to find the product in each category
async function findProductInCategories(productId) {
  const categories = ["tents", "sleeping-bags", "backpacks"];
  
  for (const category of categories) {
    const dataSource = new ProductData(category);
    try {
      const product = await dataSource.findProductById(productId);
      if (product) {
        return { product, dataSource };
      }
    } catch (error) {
      // Continue to next category if this one fails
      continue;
    }
  }
  return null;
}

// Initialize product details
findProductInCategories(productId).then(result => {
  if (result) {
    const productDetails = new ProductDetails(productId, result.dataSource);
    productDetails.init();
  } else {
    console.error("Product not found in any category");
  }
});

// add listener to Add to Cart button
