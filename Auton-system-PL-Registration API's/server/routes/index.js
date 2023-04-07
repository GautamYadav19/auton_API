const express = require("express");
const db = require("../db");
const router = express.Router();

router.get("/users", async (req, res, next) => {
  try {
    let results = await db.usersList();
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.post("/registration", async (req, res, next) => {
  try {
    const { first_name, last_name, phone_number } = req.body;

    // Validate First Name
    if (!/^[A-Z][a-z]{0,49}$/.test(first_name)) {
      return res.status(400).json({
        error:
          "First Name should be up to 50 characters and start with a capital letter",
      });
    }
    // Validate Last Name
    if (!/^[A-Z][a-z]{0,49}$/.test(last_name)) {
      return res.status(400).json({
        error:
          "Last Name should be up to 50 characters and start with a capital letter",
      });
    }
    // Validate Last Name
    if (!/^[0-9]{10}$/.test(phone_number)) {
      return res.status(400).json({
        error:
          "Last Name should be up to 50 characters and start with a capital letter",
      });
    }

    let results = await db.CreateUsers(req.body);
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendstatus(500);
  }
});

module.exports = router;
