const { Router } = require("express");
const Product = require("../models/Products");
const { faker } = require("@faker-js/faker");

const router = Router();
let product = new Product();

router.get("/", async (req, res) => {
  try {
    const { id } = req.query;
    if (id) {
      let filteredProduct = await product.getById(id);
      res.status(200).send(filteredProduct);
    } else {
      let allProducts = await product.getAll();
      res.status(200).send(allProducts);
    }
  } catch (error) {
    console.log(error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    let { name, description, code, imgUrl, price, stock } = req.body;
    let newProduct = {
      id: faker.datatype.uuid(),
      timestamp: Date.now(),
      name,
      description,
      code,
      imgUrl,
      price,
      stock,
    };
    await product.addProduct(newProduct);
    res.status(201).json({ message: "Successfully created product" });
  } catch (error) {
    console.log(error.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, code, imgUrl, price, stock } = req.body;
    if (!name || !description || !code || !imgUrl || !price || !stock) {
      res.status(400).send({ message: "There is empty fields" });
    } else {
      const productById = await product.getById(id);
      const productUpdated = {
        id,
        timestamp: productById.timestamp,
        name,
        description,
        code,
        imgUrl,
        price,
        stock,
      };
      await product.updateById(productUpdated);
      res.status(200).json({ message: "Successfully updated product" });
    }
  } catch (error) {
    console.log(error.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await product.deleteById(id);
    res.status(200).json({ message: "Successfully deleted product" });
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;