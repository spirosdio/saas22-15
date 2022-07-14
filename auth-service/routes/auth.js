const express = require('express')
const passport = require("passport");
const router = express.Router()

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

router.post("/extend", (req, res) => {
    console.log(req.body);
});

module.exports = router;