const jwt  =require("jsonwebtoken");

const verifyToken = (req,res,next)=>{
    const token = req.cookies.token;

    // console.log(req);

    if(!token) return res.status(401).json({message:"Unauthorized"});

    jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
        if(err) return res.status(403).json({error:err});
        req.user = user;

        next();

    })
}

module.exports = verifyToken;