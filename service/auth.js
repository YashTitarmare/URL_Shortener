const jwt = require("jsonwebtoken");
const secret="Yash1234";

function setUser(user){

    // return jwt.sign(user,secret);

return jwt.sign({
    _id :user._id,
    email:user.email,
    name:user.name,

    // 3 red adding the role in the payload for the verfiay 

    role : user.role,
    }, 
    secret)
};



function getUser(token){
   // console.log("TOKEN RECEIVED:", token);
    if(!token) return null;
    return jwt.verify(token, secret);
}

module.exports={
    setUser,
    getUser,
}









