require("dotenv").config();
const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const { hashPassowrd, generateToken } = require("../utilities/bcrypt");

/**
 * CREATE USER (REGISTER)
 */
const createUser = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;

    // Check if user exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await hashPassowrd(password);

    // Create user
    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(200).json({
      message: "User created successfully",
      data: {
        _id: user._id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * USER LOGIN
 */
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT
    const token = generateToken(user);

    res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUser,
  loginUser,
};