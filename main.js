const express = require("express");
const mongoose=require("mongoose");
const Product=require("./models/Product");
const User=require("./models/User");
const Shopping=require("./models/ShoppingCart");
const productRouter = require("./routers/productRouter");
const userRouter = require("./routers/userRouter");
const shoppingRouter = require("./routers/shoppingRouter");
const authRouter =  require("./routers/authRouter");
const app = express();

app.use(express.json());

app.use("/api/v1/product/", productRouter);
app.use("/api/v1/user/", userRouter);
app.use("/api/v1/cart/", shoppingRouter);
app.use("/api/v1/auth/", authRouter);

app.use((err, req, res, next) => {
    res.status(400).json({
        status: "error",
        message: err.message,
    });
});


app.listen(process.env.PORT, () => {
    console.log(`App runnig on port ${process.env.PORT}`);
});

mongoose.set('strictQuery', false);
mongoose.connect(process.env.DATABASE, {}).then(async(con) => {
    console.log("connected to mongo")
    const products = await Product.find();
    const users = await User.find();
    const carts = await Shopping.find();
    console.log("products", products);
    console.log("users", users);
    console.log("shoopingCarts", carts);
}).catch((err) => {

})
