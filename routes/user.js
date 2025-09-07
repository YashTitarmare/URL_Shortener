const express=require("express");
const router=express.Router();

const {handleUserRegister,handleUserLogin}=require("../controllers/user");


// Render register page



// for the from happinesss
router.post("/register",handleUserRegister);

//router.post("/login",login);

router.post("/login",handleUserLogin)


module.exports=router;