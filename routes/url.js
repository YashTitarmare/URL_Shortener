const express =require('express');


const {handleGenerateNewShortURL,handleGetAnalytics,deleteURl} =require("../controllers/url")



const router =express.Router();

router.post("/",handleGenerateNewShortURL); // controllers handleGenerateNewShortURL

router.get("/analytics/:shortId",handleGetAnalytics); // http://localhost:8000/url/analytics/NyqIdtWf

// the url/analytics/:shortId


router.post("/users/delete", deleteURl);   // Delete is not support in the html ejs 
// router.get("/",FindyById);

module.exports=router;

