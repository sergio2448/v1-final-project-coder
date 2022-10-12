const { Router } = require("express");
const routesProduct = require("./products.js");
const routesCart = require("./shoppingCart.js");

const router = Router();

router.use("/products", routesProduct);
router.use("/carts", routesCart);

module.exports = router;
