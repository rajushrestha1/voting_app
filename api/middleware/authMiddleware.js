const jwt= require('jsonwebtoken');
const authMiddleware = (req, res, next) => {      
const token = req.cookies.token ||"";
if(!token){
    return res.status(401).json({ message: "Authentication required" });

  }

  try{
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    req.user={
        studentId: decoded.studentId,
        name: decoded.name,
    }
    next();

  }catch(err){
    console.error("Authentication error:", err);
    return res.status(401).json({ message: "Invalid token" });
  }

  
}
module.exports = authMiddleware;
