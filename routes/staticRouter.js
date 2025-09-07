const express =require("express");
const {StaticFunction}=require("../controllers/url");
const {handleUserLogin}=require("../controllers/user")
const { checkforAuthentication,restricto}=require("../middllewares/index");
const URL = require("../models/url");
const router =express.Router();


/// all the gets routss for the apis unders the butttons 

///   4 th changes for that amind to see thee all urls 
router.get(
  '/admin/urls',
  restricto(['ADMIN']),
  async (req, res) => {

    //console.log("User:", req.user);

    const allurls = await URL.find({});

   // console.log("All URLs:", allurls);

   // return res.re(allurls); // send raw data instead of render

   res.render("home", {
  urls: allurls,
  id:null,
});
  }
);

// 9th 

// router.get("/",restricto(['NORMAL','ADMIN']),StaticFunction);

router.get("/",StaticFunction);

router.get("/register", (req, res) => {
    res.render("register"); // register.ejs
});

router.get("/login", (req, res) => {
    res.render("login"); // register.ejs
});




module.exports=router;