const userModel=require('../models/user.model');
const {validationResult}=require('express-validator');
const userService=require('../services/user.service');

module.exports.registerUser=async (req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const {fullname,email,password}=req.body;
       
        const userAlreadyExists=await userModel.findOne({email});
        if(userAlreadyExists){
            return res.status(400).json({message:"User already exists"});
        }

        const hashpassword=await userModel.generatehashpassword(password);

        const newUser=await userService.createUser({
            firstname:fullname.firstname,
            lastname:fullname.lastname,
            email,
            password:hashpassword
        });

        const token=newUser.generateAuthToken();

        res.cookie('token',token);
        res.status(201).json({newUser,token});
}

module.exports.loginUser=async (req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const {email,password}=req.body;

    const user=await userModel.findOne({email}).select('+password');
    if(!user){
        return res.status(404).json({message:"Invalid credentials"});
    }

    const isMatch=await user.comparePassword(password);
    if(!isMatch){
        return res.status(400).json({message:"Invalid credentials"});
    }

    const token=user.generateAuthToken();

    res.cookie('token',token);
    res.status(200).json({user,token});
}

module.exports.getProfile=async (req,res)=>{
    res.status(200).json(req.user)
}

module.exports.logoutUser=async (req,res)=>{
    try{
        const token = req.cookies.token || (req.headers.authorization?.startsWith('Bearer ') ? req.headers.authorization.split(' ')[1] : null);

        if (!token) {
            return res.status(400).json({ message: 'Bad Request: No token provided' });
        }

        res.clearCookie('token',{httpOnly:true,sameSite:"Strict"})
        res.status(200).json({message:"Logout Successful"})

    }catch(err){
        
        console.error('Logout error:', err.message);
        return res.status(500).json({ message: 'Internal server error' });
    }

}