
const User = require("../models/user");
const {check, validationResult}=require("express-validator");
const jwt=require("jsonwebtoken");
const expressJwt=require("express-jwt");

exports.signup=(req,res)=>{
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(422).json({
            error:errors.array()[0].msg,
            error2:errors.array()[0].param
        })
    }
   
    //body-parser middlewaer
    //new user of User type
   const user =  new User(req.body);
   //not callbacks are depreacted
   //below is the promises syntax to save then catch
  user.save().then((saveduser)=>{
    res.json(saveduser)
  }).catch((err)=>{
    res.status(400).json({
        error: err
    })
  })
   
}

exports.signout=(req,res)=>{
    res.send("user signout");
}


exports.sign=(req,res)=>{
  const {email,password} = req.body;

  const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(422).json({
            error:errors.array()[0].msg,
            error2:errors.array()[0].param
        });
    }

    User.findOne({email},(err,user)=>{
      if(err){
        res.status(400).json({
          error:"User doesn't exist"
        })
      }
      if(!user. authenticate (password)){
      return res.status(401).json({
        error:"Email and password dont match"
      })
      }
      //create token
      const token = jwt.sign({_id : user._id}, process.env.SECRET)
      //put token in cookie
      //syn of cookie-
      //name, token , expiration date
      res.cookie("token",token,{expire : new Date()+9999});
    })
};