import { loadHeaderFooter, getParam } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";

loadHeaderFooter();

const searchTerm = (getParam("search") || "").trim();
const category = getParam("category") || "tents";
const element = document.querySelector(".product-list");
const heading = document.querySelector(".products h2");

if (searchTerm) {
  heading.textContent = `Search results for "${searchTerm}"`;
  renderSearchResults(searchTerm);
} else {
  renderCategory(category);
}

function renderCategory(cat) {
  const dataSource = new ExternalServices(cat);
  const listing = new ProductList(cat, dataSource, element);
  listing.init();
}

async function renderSearchResults(term) {
  const categories = ["tents", "backpacks", "sleeping-bags"];
  const lowerTerm = term.toLowerCase();

  try {
    const allProducts = (
      await Promise.all(categories.map((cat) => new ExternalServices(cat).getData()))
    ).flat();

    const filtered = allProducts.filter((product) => {
      const nameMatch = product.Name?.toLowerCase().includes(lowerTerm);
      const brandMatch = product.Brand?.Name?.toLowerCase().includes(lowerTerm);
      return nameMatch || brandMatch;
    });

    if (!filtered.length) {
      element.innerHTML = `<p class="no-results">No products match "${term}".</p>`;
      return;
    }

    const listing = new ProductList("search", { getData: async () => filtered }, element);
    listing.renderList(filtered);
  } catch (err) {
    console.error("Search failed", err);
    element.innerHTML =
      '<p class="no-results">There was a problem loading search results. Please try again.</p>';
  }
}
