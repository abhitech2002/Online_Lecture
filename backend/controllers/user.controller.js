const express = require("express");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

const router = express.Router();

exports.register = async (req, res) => {
  try {
    const { userName, role, email, password } = req.body;

    // Checking if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ message: "User Already Exists" });
    }

    // Encrypting password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      userName,
      email,
      role,
      password: hashedPassword,
    });
    await newUser.save();

    res.status(201).send({
      message: "User Created Successfully.",
    });
  } catch (error) {
    console.error(error.stack);
    res.status(500).send({ message: "Internal Server Error" });
  }
};


// export default router