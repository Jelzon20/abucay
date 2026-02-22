import Auth from "../models/auth.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Register new user
export const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // 1️⃣ Check if username already exists
    const existingUser = await Auth.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // 2️⃣ Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3️⃣ Create new user
    const user = new Auth({
      username,
      password: hashedPassword,
    });

    await user.save();

    // 4️⃣ Send success response (NO token)
    res.status(201).json({
      message: "User registered successfully. Please login.",
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login user
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkeyzzz";

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await Auth.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // create token (expires in 1 hour)
    const token = jwt.sign(
      { id: user._id, username: user.username },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username
      }
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all users
export const getUsers = async (req, res) => {
  try {
    const users = await Auth.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get user by ID
export const getUserById = async (req, res) => {
  try {
    const user = await Auth.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update user
export const updateUser = async (req, res) => {
  try {
    const user = await Auth.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  try {
    const user = await Auth.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};