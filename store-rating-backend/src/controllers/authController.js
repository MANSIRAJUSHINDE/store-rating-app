// src/controllers/authController.js
const { User } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.signup = async (req, res) => {
  try {
    const { name, email, password, address } = req.body;

    const user = await User.create({
      name,
      email,
      password,
      address,
    });

    res.status(201).json({
      message: "User created",
      user: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(400).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("========== LOGIN ATTEMPT ==========");
    console.log("Email:", email);

    const user = await User.findOne({
      where: { email }
    });

    console.log("User Found:", !!user);

    if (!user) {
      return res.status(401).json({
        message: "User not found"
      });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    console.log("Password Match:", passwordMatch);

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.updatePassword = async (req, res) => {
  // logic
};

exports.getMe = async (req, res) => {
  res.json(req.user);
};