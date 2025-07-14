const jwt=require('jsonwebtoken');
const userModel = require("../models/user.model");
const captainModel = require('../models/captain.model');


module.exports.authUser=async (req,res,next)=>{

    try{
       const token =(req.headers.authorization?.startsWith('Bearer ') ? req.headers.authorization.split(' ')[1] : null);
    
       if(!token){
          return res.status(401).json({messgae:"Unathorized : token not provided"});
       }
    
       const decode=jwt.verify(token,process.env.SECRET);
    
       const user=await userModel.findById(decode._id);
       if(!user){
           return res.status(401).json({message : "Unauthorized : User not found"});
       }
    
       req.user=user;
       next();
    }catch(err){
       console.error('Authentication error:', err.message);
       return res.status(401).json({ message: 'Unauthorized: Invalid or expired token' });
    }

}

module.exports.authCaptain=async (req,res,next)=>{
    try{
        const token =(req.headers.authorization?.startsWith('Bearer ') ? req.headers.authorization.split(' ')[1] : null);
        console.log(token);
     
        if(!token){
           return res.status(401).json({messgae:"Unathorized : token not provided"});
        }
     
        const decode=jwt.verify(token,process.env.SECRET);
     
        const captain=await captainModel.findById(decode._id);
        if(!captain){
            return res.status(401).json({message : "Unauthorized : User not found"});
        }
     
        req.captain=captain;
        next();
     }catch(err){
        console.error('Authentication error:', err.message);
        return res.status(401).json({ message: 'Unauthorized: Invalid or expired token' });
     } 
}