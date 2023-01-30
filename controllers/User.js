const User = require("../models/User");
const getAllUsers = async (req,res,next)=>{
    const users= await User.find();
    res.status(200).json({
        status:"ok",
        data:users,

    });
}
const addUser = async (req,res,next)=>{
    let newUser= new User();
    newUser.email= req.body.email;
    newUser.password= req.body.password;
    newUser.firstName= req.body.firstName;
    newUser.lastName= req.body.lastName;
    newUser=await newUser.save();
    res.status(200).json({
        status:"ok",
        dataInserted:newUser,

    });
}
const getUser = async (req,res,next)=>{
    let user=await User.findById(req.params.id);
    res.status(200).json({
        status:"ok",
        dataGet:user,

    });
}
const editUser = async (req,res,next)=>{
    let editUser=await User.findById(req.params.id);
    editUser.email= req.body.email;
    editUser.password= req.body.password;
    editUser.firstName= req.body.firstName;
    editUser.lastName= req.body.lastName;
    editUser=await editUser.save();
    res.status(200).json({
        status:"ok",
        dataPut:editUser,

    });
}
const deleteUser = async (req,res,next)=>{
    let user=await User.findByIdAndDelete(req.params.id);
    res.status(200).json({
        status:"ok",
        dataDelete:user,

    });
}

module.exports={
    getAllUsers,
    addUser,
    getUser,
    editUser,
    deleteUser
}