const express =require('express');
const {Message}=require("../controllers/url");
const router =express.Router();


router.get("/",Message);

module.exports=router;