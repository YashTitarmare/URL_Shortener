const express= require("express");
const URL =require('./models/url')

const path =require("path");
const token=require("jsonwebtoken");
const cookieParser = require('cookie-parser');

const {connectToMongodb} = require("./connect")

const urlRoute=require("./routes/url")
const staticRouter=require("./routes/staticRouter");
const aboutRouter=require("./routes/aboutRoute");
const  message=require("./routes/message");
const test=require("./routes/test");

const user = require("./routes/user");

// Middlware for the 
const { checkforAuthentication,
 restricto}=require("./middllewares/index");


//const { url } = require("inspector");
// const logReqRes = require("./middllewares/index")

const app=express();

const PORT=8000;
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use(checkforAuthentication);

connectToMongodb('mongodb://127.0.0.1:27017/URLShoter')
.then(()=>console.log("Connect"));

// ejs
app.set("view engine","ejs");

app.set("views",path.resolve("./views")); 

// middelware for the logs 

// app.use(logReqRes("text.txt"));

//@@@@


// specific routes first 

// non dymics routes

app.get("/alldata", async (req, res) => {
  try {
    const alldata = await URL.find({});  // this query get the data wiht await for the respone 

    const jwttoken = token.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
        data: "foobar"
      },
      "secret"
    );

    console.log("JWT:", jwttoken);

    // create ONE document (with required fields)
    const savedjwt = await URL.create({
  shortId:"yagbcj3",
  redirectURL: "https://google.com",
  jwt: jwttoken
});

    // log timestamps
    alldata.forEach(doc => {
      doc.visitHistory.forEach(item => {
        console.log(item.timestamp);
        console.log(new Date(item.timestamp));
      });
    });

    // send ONE response
    res.json({
      saved: savedjwt,
      allData: alldata,
    });

  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});


app.use("/url", urlRoute);  
app.use("/about", aboutRouter);
app.use("/message", message);
app.use("/test", test); 
app.use("/users", user);  // better than "/"
app.use("/", staticRouter); // keep home last


/// @@@@@@  Give the err oof the pass the two funttion in the uurls  
// app.use("/",checkAuth, restrictToLoggedinUserOnly, staticRouter); // keep home last

/*
app.use("/test",async(req,res)=>{
  const allurl=await URL.find({});
  return res.end(`
        <html>
        <head>
        </head>
        <body>
        ${allurl.map(url=>`<li>${url.shortId} - -${url.visitHistory.length}</li>`).join("")}
        </body>
        </html>
        
        `)
}); // funtion routes/test

*/


/*
app.get("/test",async (req,res)=>{
    const allurls=await URL.find({});
    return res.render('home',{
      urls:allurls,
    });
   });
*/
    /*
    return res.end(`
        <html>
        <head>

        </head>
        <body>
        ${allurl.map(url=>`<li>${url.shortId} - -${url.visitHistory.length}</li>`).join("")}
        </body>
        </html>
        
        `) */

// alert **
//  Daymic routee in the last
app.get("/:shortId", async (req, res) => {
  try {
    const shortId = req.params.shortId;

    const entry = await URL.findOneAndUpdate(
      { shortId },
      {
        $push: {
          visitHistory: { timestamp: Date.now() },
        },
      }
    );

    if (!entry) {
      return res.status(404).send("Short URL not found");
    }

    res.redirect(entry.redirectURL);

  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

app.listen(PORT,()=>console.log(`Server is runing at the ${PORT}`));

