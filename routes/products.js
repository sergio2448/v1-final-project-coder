const { Router } = require("express");
const Product = require("../models/Products");

const router = Router();
let product = new Product();

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.query;
  if (id) {
    let filteredProduct = await product.getById(id)
    res.status(200).send(filteredProduct)
  } else {
    let allProducts = await product.getAll();
    res.status(200).send(allProducts)
  }
  } catch (error) {
    console.log(error.message)
  }
})

router.post('/', (req, res) => {
  try {
    let newProduct = req.body;
    await product.addProduct(newProduct)
    res.status(201).send({ message: 'Successfully created product'})
  } catch (error) {
    console.log(error.message)
  }
})

router.put('/:id', (req, res) => {
  
})