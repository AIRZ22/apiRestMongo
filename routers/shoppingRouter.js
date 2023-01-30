const express = require("express");
const shoppingRouter = express.Router();
const { addCartProduct, deleteCartProduct, payCart }= require("../controllers/Shopping");
const { login, signup, protect }= require("../controllers/Auth");

shoppingRouter
    .route("/product/")
    .all(protect)
    .post(addCartProduct)

shoppingRouter
    .route("/pay/")
    .all(protect)
    .post(payCart)

shoppingRouter
    .route("/product/:id")
    .all(protect)
    .delete(deleteCartProduct)


module.exports = shoppingRouter;