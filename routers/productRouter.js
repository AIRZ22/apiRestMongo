const express = require("express");
const productRouter = express.Router();
const { getAllProducts, addProduct, getProduct, editProduct, deleteProduct }= require("../controllers/Product");
const { login, signup, protect } = require("../controllers/Auth");

productRouter
    .route("/")
    .all(protect)
    .get(getAllProducts)
    .post(addProduct);

productRouter
    .route("/:id")
    .all(protect)
    .get(getProduct)
    .put(editProduct)
    .delete(deleteProduct);


module.exports = productRouter;