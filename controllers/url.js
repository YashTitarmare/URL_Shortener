
const { nanoid } = require("nanoid");
const URL = require("../models/url");
const {  v4 } =require('uuid');


// #####  handleGenerateNewShortURL    ### ////
async function handleGenerateNewShortURL(req, res) {

  if (!req.user) {
    return res.redirect("/?login=true");
  }

  const body = req.body;

  if (!body || !body.url) {
    return res.status(400).json({ error: "url is required" });
  }

  const ID = nanoid(8);

  await URL.create({
    shortId: ID,
    redirectURL: body.url,
    visitHistory: [],
    createBy: req.user._id,
  });

  return res.redirect("/");
}




// #### handleGetAnalytics ##### 

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;

  const result = await URL.findOne({ shortId });

  if (!result) {
    return res.status(404).json({
      error: "Short URL not found",
    });
  }

  return res.json({
    totalClick: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}
// ### Message  ###
function Message(req,res){
  res.end("Message is Triger")
}


// ### Message #####
async function Test (req,res) {

    const allurls=await URL.find({});
console.log("uuid is creeate " +v4());
    return res.render('test',{
      allurls
    });
  
  }



// ### StaticFunction ### 
/*    for the pop handing   8 change the below code is for the 
async function StaticFunction(req, res) {
  // alo with arry 


  /// 2 nd chnges  

  // 6 th for the pop 
//if(!req.user) return res.redirect('/login');

const allurls =  await URL.find({ createBy: req.user._id });

 /*
  if (!req.user) {
    return res.redirect("/login");
  } 
    */


  //console.log(req.user);
/*
  return res.render("home", {
    urls: allurls,
    // 7 for thr valition of token 
    // id: req.user?._id,  
        user: req.user,
  });
}

*/





async function StaticFunction(req, res) {

  let allurls = [];

  // Only fetch URLs if user is logged in
  if (req.user) {
    allurls = await URL.find({ createBy: req.user._id });
  }

  return res.render("home", {
    urls: allurls,
    user: req.user,
  });

}

///About  ####

function About(req,res){
    res.render('about'); // for the view about.ejs no nned to impert that a sepecail things about the ejs
};


//###### end about funtions #####


 /* 
async function FindyById(req, res) {
  try {
    const shortId = req.params.shortId;

    console.log("Requested shortId:", shortId);

    const entry = await URL.findOne({ shortId });

    console.log("DB result:", entry);

    if (!entry) {
      return res.status(404).send("Not found");
    }

    await URL.updateOne(
      { shortId },
      { $push: { visitHistory: { timestamp: Date.now() } } }
    );

    res.redirect(entry.redirectURL);

  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
}


*/



module.exports = {
  handleGenerateNewShortURL,
  handleGetAnalytics,
  Message,
  Test,
  About,
  StaticFunction

};


