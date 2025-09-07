const express =require("express");
const router =express.Router();

const {About}=require("../controllers/url")



router.get("/",About)

module.exports=router;