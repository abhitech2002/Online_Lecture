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
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Checking if user is exists or not
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password..." });
    }

    // Checking if user password is correct or not
    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid email or password..." })
    }

    // Genrate JWT token
    const token = JWT.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' })

    res.status(200).json({
        data: token,
        role: user.role, // Include user's role in the response
        message: "User Sign In Sucessfully...."
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


// Route to get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: 'instructor' });
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Route to get all users
exports.getAdmin = async (req, res) => {
  try {
    const users = await User.find({ role: 'admin' });
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
