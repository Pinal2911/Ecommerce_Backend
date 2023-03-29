//load this file and use its variables
require("dotenv").config();
const mongoose = require("mongoose");

const express=require("express");
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');
const cors=require('cors');
//using own created ruoute
const authRoutes = require('./routes/auth');
const app=express();

//db connection
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser :true
}).then(()=> {
    console.log("DB CONNECTED");
})

//middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());



//myRoutes
//localhost:3000/api/signout
app.use("/api",authRoutes);

//PORT
const port = process.env.PORT || 3000;





//staring a server
//way to use var in console
app.listen(port,()=>{
    console.log(`app is running at ${port}`)
});
