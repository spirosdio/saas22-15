const express = require("express");
const router = express.Router();
const users = require("../models/user");


router.get("/get-user", (req, res) => {
    res.json(req.user);
  });



router.patch("/extend/:id", async (req, res) => {
    let updatedDays = await users.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
  
    console.log(req.body);
    try {
      res.status(200).json({
        status: "Success",
        data: {
          daysleft: updatedDays,
        },
      });
    } catch (err) {
      console.log(err);
    }
  });
  
module.exports = router;