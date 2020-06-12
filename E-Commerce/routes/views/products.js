const express = require("express");
const router = express.Router();
// const productMocks = require("../utils/mocks/products");

// I add the line bellow, lets see if works
const ProductsService = require("../../services/products");

const productService = new ProductsService();

router.get("/", async function (req, res, next) {
  const { tags } = req.query;
  // throw new Error("This is an error");
  try {
    const products = await productService.getProducts({ tags });
    res.render("products", { products });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
