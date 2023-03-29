const mongoose=require("mongoose");
const crypto=require('crypto');
const {v4 : uuidv4}=require("uuid");
var userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        maxlength:32,
        trim:true
    },
    lastname:{
        type:String,
        require:false,
        maxlength:32,
        trim:true
    },
    userinfo:{
            type:String,
            trim:true
    },
    email:{
        type:String,
        trim:true,
        required:true,
        unique:true
    },
    //TODO: come backhere
    encry_password:{
        type:String,
       
    },
    salt:String,
    role:{
        type:Number,
        default:0
        //higher no higher priority
    },
    purchases : {
        type:Array,
        default:[]
    }
    //creation date ans time
},{timestamps:true}
);
userSchema.virtual("password")
.set(function(password){
    //._var name makes the variable private
        this._password=password,
        this.salt=uuidv4(),
        this.encry_password = this.securePassword(password);
})
.get(function(){
    return this._password
})
userSchema.methods = {

    authenticate : function (plainpassword){
        return this.securePassword(plainpassword) === this.encry_password
    },
    securePassword : function (plainpassword){
        if(!plainpassword) return "";
        try{
            return crypto.createHMac('sha256',this.salt).update(plainpassword).digest('hex');
        }catch(err){
                return "";
        }
    }
}
//syntax to be used outside
//User - to access it outside using this name
//userScehma- it is the schema itself
module.exports=mongoose.model("User",userSchema);