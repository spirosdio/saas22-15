const express = require('express')
const passport = require("passport");
const router = express.Router()

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
    "/google/callback",
    passport.authenticate("google", {
        failureRedirect: "/",
        successRedirect: "http://localhost:3000/main1",
    })
);

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});

router.get("/user", (req, res) => {
    if (req.user) {
        res.json(req.user);
    }
});


module.exports = router;