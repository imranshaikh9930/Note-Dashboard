const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require('cookie-parser');
const app = express();
app.use(cookieParser());
const userRoutes = require("./routes/userRoutes");
const noteRoutes  = require("./routes/notesRoutes");
const jwt = require("jsonwebtoken");
const verifyToken = require("./middleware/authMiddleware")
const connectDb = require("./utils/db");
const PORT = process.env.PORT || 3800;

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173', // or your deployed frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: "true", // if sending cookies
  }));

app.use("/api/auth",userRoutes)
app.use("/api/user",noteRoutes)

// app.get("/me", (req, res) => {
//   const token = req.cookies.token;
  
//   if (!token) return res.status(401).json({ message: "Not Authenticated" });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     res.status(200).json({ user: decoded });
//   } catch (err) {
//     res.status(401).json({ message: "Invalid Token" });
//   }
// });
app.get('/protected', verifyToken, (req, res) => {
  res.json({ message: 'You have access to this route', user: req.user });
});
app.listen(PORT,()=>{
    console.log(`Server Running on ${PORT}`)
    connectDb();
})