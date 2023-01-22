const Product = require("../models/Product");
const getAllProducts = async (req,res,next)=>{
    const products= await Product.find();
    res.status(200).json({
        status:"ok",
        data:products,

    });
}
const addProduct = async (req,res,next)=>{
    let newProduct= new Product();
    newProduct.name= req.body.name;
    newProduct.price= req.body.price;
    newProduct.unit= req.body.unit;
    newProduct.inventory= req.body.inventory;
    newProduct=await newProduct.save();
    res.status(200).json({
        status:"ok",
        dataInserted:newProduct,

    });
}
const getProduct = async (req,res,next)=>{
    let product=await Product.findById(req.params.id);
    res.status(200).json({
        status:"ok",
        dataGet:product,

    });
}
const editProduct = async (req,res,next)=>{
    let editProduct=await Product.findById(req.params.id);
    editProduct.name= req.body.name;
    editProduct.price= req.body.price;
    editProduct.unit= req.body.unit;
    editProduct.inventory= req.body.inventory;
    editProduct=await editProduct.save();
    res.status(200).json({
        status:"ok",
        dataPut:editProduct,

    });
}
const deleteProduct = async (req,res,next)=>{
    let product=await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({
        status:"ok",
        dataDelete:product,

    });
}

module.exports={
    getAllProducts,
    addProduct,
    getProduct,
    editProduct,
    deleteProduct
}