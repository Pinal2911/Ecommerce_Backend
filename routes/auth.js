const express=require('express');
const {check}=require("express-validator");
const router=express.Router();
const {signout, signup, signin }=require("../controllers/auth");

router.post("/signup",[
    check("name","Enter name with atleast 3 letters").isLength({min: 3}),
    check("email","Enter valid mail").isEmail(),
    check("password","Enter password length greater than 3 letters").isLength({min:3})
],signup);
router.get("/signout",signout);

router.post("/signin",[
    check("email","email is required ").isEmail(),
    check("password","password is required and length min req is 1").isLength({min:1})
],
signin);
router.get("/signin",signin);

module.exports=router;