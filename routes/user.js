const express=require("express");
const router=express.Router();

const {handleUserRegister,handleUserLogin,handleLogout}=require("../controllers/user");


// Render register page



// for the from happinesss
// Register page
router.get("/register", (req, res) => {
    res.render("register");
});

// Register form submit
router.post("/register", handleUserRegister);

//router.post("/login",login);

router.post("/login",handleUserLogin)



router.get("/logout", handleLogout);


module.exports=router;