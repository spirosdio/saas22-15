const express = require('express')
const passport = require("passport");
const router = express.Router()
const users = require('../models/user');

router.get("/google", passport.authenticate("google", { scope: ['profile', 'email'] }));

router.get(
    "/google/callback",
    passport.authenticate("google", {
        failureRedirect: "http://localhost:3000/",
        successRedirect: "http://localhost:3000/main1",
    })
);

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("http://localhost:3000/");
});

router.get("/user", (req, res) => {
    /*
    if (req.user) {
        res.json(req.user);
    }
    */
    res.json(req.user);
});
/*
router.post("/extend", (req, res) => {
    console.log(req.body);
    //req.user();
    //console.log(user._id);
});
*/

router.patch("/extend/:id",async (req, res) => {
    
    
    let updatedDays =await  users.findByIdAndUpdate(req.params.id,req.body,{
        new : true,
        runValidators : true
      });
    
    //console.log(req.body); 
    try{
        res.status(200).json({
            status : 'Success',
            data : {
              "daysleft" : updatedDays
            }
          })
    }catch(err){
        console.log(err)
    }
    
   
});

module.exports = router;