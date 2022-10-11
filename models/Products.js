const fs = require("fs/promises");
const path = require("path");

const pathDataProduct = path.resolve(__dirname, "../data/products.json")

class Product {
  constructor() {}

  getAll = async () => {
    try {
      const content = await fs.readFile(pathDataProduct, "utf-8");
      const products = JSON.parse(content || "[]");
      return products;
    } catch (error) {
      console.log(error.message);
      return [];
    }
  };

  getById = async (id) => {
    try {
      const content = await this.getAll();
      const product = content.filter((product) => product.id === id);
      return product;
    } catch (error) {
      console.log(error.message);
    }
  };

  updateById = async (product) => {
    try {
      const { id, timestamp, name, description, code, imgUrl, price, stock } =
        product;
      const products = await this.getAll();
      const updatedProducts = products.map((prod) => {
        if (prod.id === id) {
          let setProduct = {
            id,
            timestamp,
            name,
            description,
            code,
            imgUrl,
            price,
            stock,
          };
          return setProduct;
        } else {
          return prod;
        }
      });

      await fs.writeFile(pathDataProduct, JSON.stringify(updatedProducts));
    } catch (error) {
      console.log(error.message);
    }
  };

  addProduct = async (product) => {
    try {
      const products = await this.getAll();
      products.push(product);

      await fs.writeFile(pathDataProduct, JSON.stringify(products));
    } catch (error) {
      console.log(error.message);
    }
  };

  deleteAll = async () => {
    try {
      await fs.writeFile(
        path.resolve(__dirname, "../data/products.json"),
        "[]"
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  deleteById = async (id) => {
    try {
      const products = await this.getAll();
      const filteredProducts = products.filter((prod) => prod.id !== id);
      await fs.writeFile(
        path.resolve(__dirname, "../data/products.json"),
        JSON.stringify(filteredProducts)
      );
    } catch (error) {
      console.log(error.message);
    }
  };
}

module.exports = Product;