const express = require("express");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

const router = express.Router();

const User = require("../../models/UserModel");

router.post("/", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  let emailExist = await User.findOne({ email: email });
  if (emailExist) {
    return res.status(400).json({ msg: "User already exists" });
  } else {
    const newUser = new User({
      name,
      email,
      password,
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save((err) => console.error(err));

        jwt.sign(
          { id: newUser._id },
          config.get("jwtSecret"),
          { expiresIn: 3600 },
          (err, token) => {
            if (err) throw err;
            res.json({
              token,
              user: {
                name: newUser.name,
                email: newUser.email,
              },
            });
          }
        );
      });
    });
  }
});

module.exports = router;
