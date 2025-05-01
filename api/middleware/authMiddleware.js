const jwt = require("jsonwebtoken");


const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
  
    console.log("Token from cookies abhi2 :", token); // Add this to debug
  
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ error: "Token verification failed" });
      }
      req.user = user;
      next();
    });
  };


  module.exports = verifyToken
  