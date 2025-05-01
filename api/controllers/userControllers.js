const { google } = require('googleapis');
const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const axios =require("axios");


const generateToken = (userExist) => {
  return jwt.sign({ id: userExist._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};


const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'postmessage' // or actual redirect URI if you are not using `postmessage`
);

const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Check if all fields are provided
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 2. Check if user already exists
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 3. Hash the password
    const hashPassword = await bcrypt.hash(password, 10);

    // 4. Create a new user
    const newUser = new User({
      name,
      email,
      password: hashPassword,
    });

    // 5. Save user to DB
    await newUser.save();

    // 6. Respond with success
    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Signup Error:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(400).json({ message: "Register first" });
    }

    const isPassword = await bcrypt.compare(password, userExist.password);
    if (!isPassword) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    const token = generateToken(userExist);

    // Set secure cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Ensures HTTPS in production
      sameSite: "None", // Needed for cross-site cookies
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(200).json({
      message: "Login successful",
      user: {
        id: userExist._id,
        name: userExist.name,
        email: userExist.email,
      },
    });
  } catch (error) {
    console.error("Signin Error:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};



const googleController = async (req, res) => {
  try {
  
    const code = req.body.code; // use body if you're using postmessage
    const { tokens } = await oauth2Client.getToken(code);

    

    oauth2Client.setCredentials(tokens);

    const userRes = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`
    );

    

    const { email, name } = userRes.data;
    let user = await User.findOne({ email });

    if (!user) {
      const randomPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(randomPassword, 10);

      user = await User.create({
        name,
        email,
        password: hashedPassword,
      });
    }

    const token = jwt.sign(
      { _id: user._id, email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });


    res.status(200).json({ message: 'success', user });
  } catch (error) {
    console.error('Google OAuth error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const logoutController = async(req,res)=>{
    res.clearCookie("token",{
      httpOnly:true,
      secure:true,
      sameSite:"Lax"

    })
    
    res.status(200).json({ message: "Logged out successfully" });
}
module.exports = { registerController, loginController,logoutController,googleController };
