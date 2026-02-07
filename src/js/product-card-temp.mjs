// Generate HTML for a product card
export function productCardTemplate(product) {
  const imageUrl = product.Image || product.Images?.PrimaryLarge || '';
  return `<li class="product-card">
    <a href="product_pages/?product=${product.Id}">
      <img src="${imageUrl}" alt="Image of ${product.Name}">
      <h2 class="card__brand">${product.Brand.Name}</h2>
      <h3 class="card__name">${product.Name}</h3>
      <p class="product-card__price">$${product.ListPrice}</p>
    </a>
  </li>`
}