const fs = require("fs/promises");
const path = require("path");

const pathDataCart = path.resolve(__dirname, "../data/carts.json");

class Cart {
  constructor() {}

  getAll = async () => {
    try {
      const content = await fs.readFile(pathDataCart, "utf-8");
      const carts = JSON.parse(content || "[]");
      return carts;
    } catch (error) {
      console.log(error.message);
    }
  };

  getCartById = async (id) => {
    try {
      const carts = await this.getAll();
      const cart = carts.filter((cart) => cart.id === id);

      return cart;
    } catch (error) {
      console.log(error.message);
    }
  };

  getProductsCart = async (cartId) => {
    try {
      const cart = await this.getCartById(cartId);
      const products = cart[0].product;
      return products;
    } catch (error) {
      console.log(error.message);
    }
  };

  addCart = async (cart) => {
    try {
      const carts = await this.getAll();
      carts.push(cart);

      await fs.writeFile(pathDataCart, JSON.stringify(carts));
    } catch (error) {
      console.log(error.message);
    }
  };

  addProductToCart = async (cartId, product) => {
    try {
      const carts = await this.getAll();
      const updatedCarts = carts.map((cart) => {
        if (cart.id === cartId) {
          cart[0].product.push(product);
          return cart;
        } else {
          return cart;
        }
      });
      await fs.writeFile(pathDataCart, JSON.stringify(updatedCarts));
    } catch (error) {
      console.log(error.message);
    }
  };

  deleteCartById = async (cartId) => {
    try {
      const carts = await this.getAll();
      const filteredCarts = carts.filter((cart) => cart.id !== cartId);

      await fs.writeFile(pathDataCart, JSON.stringify(filteredCarts));
    } catch (error) {
      console.log(error.message);
    }
  };

  deleteProductById = async (cartId, productId) => {
    try {
      const carts = await this.getAll();
      const updatedCarts = carts.map((cart) => {
        if (cart.id === cartId) {
          const filterdProducts = cart.product.filter(
            (prod) => prod.id !== productId
          );
          cart.product = filterdProducts;
          return cart;
        } else {
          return cart;
        }
      });

      await fs.writeFile(pathDataCart, JSON.stringify(updatedCarts));
    } catch (error) {
      console.log(error.message);
    }
  };
}

module.exports = Cart;
