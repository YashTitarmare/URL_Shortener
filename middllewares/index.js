const { getUser }=require("../service/auth")



// 1 .change for the perviouse create the one funtion and reduce the funtion repate part 


function checkforAuthentication(req,res,next){
  const tokencookie=req.cookies?.token; // cahnge inthe beare to cookies  the all 

  if(!tokencookie)  return next();


    const token =tokencookie;

    const user=getUser(token);

    req.user=user;
    next();
}

 /// Role base acccess 

function restricto(role){


  // Cloureser
return function (req,res,next){

  if(!req.user) return res.redirect("/login");

if(!role.includes(req.user.role)) return res.end("UnAuthzoation")


  next();

};



}




module.exports={
 checkforAuthentication,
 restricto,

}



/*
async function restrictToLoggedinUserOnly(req,res,next) {

/// ### without cookies ####/////


const userUid=req.headers["authorization"];

//console.log(req);
// const userUid=req.cookies.uuid;

if(!userUid) {
    return res.redirect("/login");
  }
const token =userUid.split("Bearer")[1];     // "bearer [35534eghtsddgrt6ddre]"
const user=  getUser(token);

if (!user) return res.redirect("/login");

  req.user=user;

  next();

}




async function checkAuth(req,res,next) {

//const userUid=req.cookies.uuid;

const userUid = req.headers.authorization;
console.log(req.headers);

if (!userUid) {
  return next();
}

// Fix is here 👇
const token = userUid.split(" ")[1].trim();  

const user = getUser(token);

req.user = user;

next();

}
  

*/







 





/* 


/// ####  Logs       ###### /// 




// /middllewares   index.js
/*
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
const fs = require("fs");
const UAParser = require("ua-parser-js");
 


function logReqRes(filename) {
  return (req, res, next) => {
    req.name = "yash";
     const parser = new UAParser(req.headers["user-agent"]);
    const result = parser.getResult();
  
    const browserName = result.browser.name;
// ##############################
    // Cancel request if browser undefined

    /* if (!browserName) {
      return res.status(400).json({
        error: "Browser information required",
      });
    }
      
//####################################
    
   // Parse browser info
   

    const logData = `
${Date.now()} :
Method: ${req.method}
IP: ${req.ip}
URL: ${req.originalUrl}
Browser: ${result.browser.name} ${result.browser.version}
OS: ${result.os.name}
`;



      fs.appendFile(filename, logData, (err) => {
      if (err) {
        console.error("Logging failed:", err);
      }

      console.log("Middleware request", req.name);
      next();
    });
  };
}



module.exports = logReqRes;
*/
