const { Router } = require("express");
const routes = require("./products.js");

const router = Router();

router.use("/products", routes);

module.exports = router;
