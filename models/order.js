const mongoose=require("mongoose");
const {ObjectId}=mongoose.Schema;

const ProductCartSchema =new mongoose.Schema({
    product : {
        type : ObjectId,
        ref : "Product"
    },
    name : String,
    count : Number,
    price : Number

});

const ProductCart = mongoose.Schema("ProductCart",ProductCartSchema);

const orderSchema=new mongoose.Schema({
    //array of total number of procducts in cart
    products : [ProductCartSchema],
    transaction_id:{},
    amount : {
        type:Number
    },
    address : String,
    updated : Date,
    user:{
        type:ObjectId,
        ref:"User"
    }


},{timestamps:true});

const Order = mongoose.Schema("Order",orderSchema);
module.exports = {Order , ProductCart};