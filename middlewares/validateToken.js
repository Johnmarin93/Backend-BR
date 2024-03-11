import  jwt from 'jsonwebtoken';

 const authRequired = (req, res, next) =>{
    const {token} = req.cookies
    
    if(!token) return res.status(401).json({message:"No token, authorization denied"});

    jwt.verify(token,"Token_secret123", (err, user)=>{
        if (err) return res.status(403).json({message: "Invalid token"});
        req.user = user
        next();
    })
    
}

export default authRequired;