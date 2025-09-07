const express =require('express');
const {Test}=require("../controllers/url")

const router=express.Router();

router.get("/",Test);

module.exports=router;

/*
router.get("/",(req,res)=>{
  // for the pages  res.render("test");

  res.render("test");

});
*/

