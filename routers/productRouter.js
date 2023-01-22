const express = require("express");
const productRouter = express.Router();
const { getAllProducts, addProduct, getProduct, editProduct, deleteProduct }= require("../controllers/Product");

productRouter
    .route("/")
    .get(getAllProducts)
    .post(addProduct);

productRouter
    .route("/:id")
    .get(getProduct)
    .put(editProduct)
    .delete(deleteProduct);


module.exports = productRouter;