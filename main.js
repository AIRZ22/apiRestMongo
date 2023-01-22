const express = require("express");
const mongoose=require("mongoose");
const Product=require("./models/Product");
const User=require("./models/User");
const productRouter = require("./routers/productRouter");
const userRouter = require("./routers/userRouter");
const app = express();

app.use(express.json());

app.use("/api/v1/product/", productRouter);
app.use("/api/v1/user/", userRouter);

app.listen(process.env.PORT, () => {
    console.log(`App runnig on port ${process.env.PORT}`);
});

mongoose.set('strictQuery', false);
mongoose.connect(process.env.DATABASE, {}).then(async(con) => {
    console.log("connected to mongo")
    const products = await Product.find();
    const users = await User.find();
    console.log("products", products);
    console.log("users", users);
}).catch((err) => {

})
