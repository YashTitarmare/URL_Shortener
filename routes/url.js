const express =require('express');


const {handleGenerateNewShortURL,handleGetAnalytics} =require("../controllers/url")



const router =express.Router();

router.post("/",handleGenerateNewShortURL); // controllers handleGenerateNewShortURL

router.get("/analytics/:shortId",handleGetAnalytics); // http://localhost:8000/url/analytics/NyqIdtWf
// the url/analytics/:shortId

// router.get("/",FindyById);

module.exports=router;

