const User = require("../models/users");
const { setUser } = require("../service/auth");
const { v4 } = require('uuid');

async function handleUserRegister(req, res) {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) {
        return res.redirect('/login');
    }

    await User.create({
        name,
        email,
        password
    });
    res.redirect('/login');
}



const handleLogout = (req, res) => {

    // clear authentication cookie
    res.clearCookie("token");

    // redirect to home page
    return res.redirect("/");

};


async function handleUserLogin(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({
        email: email,
        password: password
    }); 

    if (!user)
        return res.status(401).json({
            error: "Invalid Username or Password",
        });

    const token = setUser(user);
    
   res.cookie("token",token);
   
   return res.redirect("/");

 //return res.json({ token });   // send token back


}



module.exports = {
    handleUserRegister,
    handleUserLogin,
    handleLogout,
};



