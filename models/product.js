const mongoose=require("mongoose");
const {ObjectId}=mongoose.Schema;
const productSchema=new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true,
        maxlength:32
        
    },
    description:{
        type:String,
        trim:true,
        required:true,
        maxlength:2000
    },
    price : {
        type:Number,
        required:true,
        maxlength:32,
        trim:true
    },
    category:{
        //here we are reusing the category schema
        //use obj id and prvide refernce from where it is coming
        //of type objectid -- catgory
        type:ObjectId,
        ref:"Category",
        required:true
    },
    stock : {
        type:Number
    },
    sold : {
        type:Number,
        default:0
    },
    photo:{
        data : Buffer,
        //images in database
        contentType:String
    }
},{timestamps:true});
module.exports=mongoose.model("Product",productSchema);