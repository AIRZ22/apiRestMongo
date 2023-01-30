const express = require("express");
const userRouter = express.Router();
const { getAllUsers, addUser, getUser, editUser, deleteUser }= require("../controllers/User");

userRouter
    .route("/")
    
    .get(getAllUsers)
    .post(addUser);

userRouter
    .route("/:id")
    
    .get(getUser)
    .put(editUser)
    .delete(deleteUser);


module.exports = userRouter;