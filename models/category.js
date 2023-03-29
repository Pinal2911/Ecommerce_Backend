const mongoose=require("mongoose")
const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true,
        maxlength:32,
        unique:true
    }
    //new entry is made at that time the actual time is
    //recorded in database
},{timestamps : true});
//export it
module.exports=mongoose.model("Category",categorySchema);