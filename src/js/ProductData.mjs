
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

  getData() {
    return fetch(this.path)
      .then(convertToJson)
      .then((data) => {
        // Handle different JSON structures
        if (data.Result && Array.isArray(data.Result)) {
          return data.Result;
        }
        return Array.isArray(data) ? data : [];
      });
  }

  async findProductById(id) {
    const products = await this.getData();
    return products.find((item) => item.Id === id);
  }
}
