import { loadHeaderFooter, getParam } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";

loadHeaderFooter();

const searchTerm = getParam("search");
const category = getParam("category") || "tents";
const element = document.querySelector(".product-list");
const heading = document.querySelector(".products h2");

if (searchTerm) {
  heading.textContent = `Search results for "${searchTerm}"`;
  renderSearchResults(searchTerm);
} else {
  const dataSource = new ExternalServices(category);
  const listing = new ProductList(category, dataSource, element);
  listing.init();
}

async function renderSearchResults(term) {
  const categories = ["tents", "backpacks", "sleeping-bags"];
  const lowerTerm = term.toLowerCase();

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
}
