const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const dotenv = require("dotenv");
const JWT_SECRET = process.env.JWT_SECRET || "supersecret";
const nodemailer = require("nodemailer");
dotenv.config();
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
transporter.verify((error, success) => {
  if (error) {
    console.log("Error with mail server:", error);
  } else {
    console.log("Mail server ready");
  }
});
function generateOtp() {
  const value = 10000 + Math.round(Math.random() * 90000);
  return `${value}`.slice(1);
}
async function sendOtp(req, res) {
  try {
    const user = await User.getUserByPhone(email);

    // if (!user) return res.status(401).json({ message: "User not found" });
    const otp = generateOtp();
    const html = `<h1 style={{color: '#926f6fff'}}>Html exaple <b>${otp}</b></h1>`;
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Sending otp",
      text: `Otp: ${otp}`,
      html,
    });
    res.status(200).json({
      success: true,
      messageId: info.messageId,
      response: info.response,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Login failed" });
  }
}

async function register(req, res) {
  try {
    const { username, email, password, phone } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    let user = await User.getUserByPhone(phone);
    if (user) {
      res.status(500).json({ message: "Registered user" });
      return;
    }
    user = await User.createUser({
      username,
      email,
      phone,
      password: hashedPassword,
      role: 10,
    });

    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Registration failed" });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.getUserByPhone(email);

    if (!user) return res.status(401).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token, created_at: new Date() });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Login failed" });
  }
}

async function profile(req, res) {
  try {
    throw new Error('asdf')
    const user = await User.getUserById(req.user.id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Cannot fetch profile" });
  }
}

module.exports = { register, login, profile, sendOtp };
