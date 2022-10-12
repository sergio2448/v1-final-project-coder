const { Router } = require("express");
const Cart = require("../models/ShoppingCart");
const { faker } = require("@faker-js/faker");

const router = Router();
let cart = new Cart();

router.post("/", async (req, res) => {
  try {
    const { product } = req.body;
    const newCart = {
      id: faker.datatype.uuid(),
      timestamp: new Data.now(),
      product: [],
    };
    await cart.addCart(newCart);
    res.status(201).send({ cartId: id });
  } catch (error) {
    console.log(error.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await cart.deleteCartById(id);
    res.status(200).json({ message: "Successfully deleted cart" });
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/:id/products", async (req, res) => {
  try {
    const { id } = req.params;
    const products = await cart.getProductsCart(id);
    res.status(200).send(products);
  } catch (error) {
    console.log(error.message);
  }
});

router.post("/:id/products", async (req, res) => {
  try {
    const { id } = req.params;
    const { product } = req.body;
    await cart.addProductToCart(id, product);
    res.status(201).json({ message: "Successfully added product" });
  } catch (error) {
    console.log(error.message);
  }
});

router.delete("/:id/products/:id_prod", async (req, res) => {
  try {
    const { id, id_prod } = req.params;
    await cart.deleteProductById(id, id_prod);
    res.status(200).json({ message: "Successfully deleted product" });
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
