const catchAsync = require("../utils/catchAsync");
// const { promisify } = require("util");
const Cart = require("../models/ShoppingCart");
const addCartProduct = catchAsync(async (req,res,next)=>{
    let cart= await Cart.findOne();
    let pi = req.body.products;
    let ps = [];let total = 0;
    pi.forEach(e => {
        total += (e.price * e.quantity);
        ps.push(e);
    });
    if (cart && cart.status == "PENDING") {
        let products  = cart.products; 
        products.forEach(e => {
            total += (e.price * e.quantity);
            ps.push(e);
        });
        
        let editCart = await Cart.findById(cart.id);
        editCart.invoiceNumber = req.body.invoiceNumber;
        editCart.status = req.body.status;
        editCart.totalAmount = total;
        editCart.user = req.body.user;
        editCart.products = ps;
        editCart = await editCart.save();
        cart = editCart;
    } else if (!cart) {
        let newCart = new Cart();
        newCart.invoiceNumber =  req.body.invoiceNumber;
        newCart.status = req.body.status;
        newCart.totalAmount = total; 
        newCart.user = req.body.user;
        newCart.products = ps;
        newCart = await newCart.save();
        cart = newCart;
    } else {
        throw new Error("No se puede adicionar producto a un carrito en estado PAID")
    }

    res.status(200).json({
        status:"ok",
        dataInserted:cart

    });
})
const payCart = catchAsync(async (req,res)=>{
    let cart= await Cart.findOne();
    let pr =  cart.products; 
    if (cart && cart.status == "PENDING" && pr.length >= 1) {
        let editCart = await Cart.findById(cart.id);
        editCart.status = "PAID";
        editCart = await editCart.save();
    } else {
        throw new Error("Error no cumpple los requisitos para pagar.")
    }

    res.status(200).json({
        status:"ok",
        dataPay:"Se pago el carrito de compra.",

    });
})
const deleteCartProduct = catchAsync(async (req,res)=>{
    let cart= await Cart.findOne();let products = cart.products;
    let pe = []; let total = 0;let { id } = req.params;
    let inc = products.find(e => e.id == id);
    if (cart && cart.status == "PENDING" && inc) {
        products.forEach(e => {
            if (e.id != id) {
                total += (e.price * e.quantity);
                pe.push(e);
            }
        });
        let editCart = await Cart.findById(cart.id);
        editCart.totalAmount = total;
        editCart.products = pe;
        editCart = await editCart.save();
    } else if (!inc && id){
        throw new Error("Error al eliminar el producto.");
    }

    res.status(200).json({
        status:"ok",
        dataCartDelete:"delete product cart",

    });
})

module.exports={
    addCartProduct,
    payCart,
    deleteCartProduct
}