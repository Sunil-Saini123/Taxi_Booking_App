const captainModel=require('../models/captain.model');
const {validationResult}=require('express-validator');
const captainService=require('../services/captain.service');
const { models } = require('mongoose');

module.exports.registerCaptain=async (req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const {fullname,email,password,vehicle}=req.body;
        
        const captainAlreadyExists=await captainModel.findOne({email});
        if(captainAlreadyExists){
            return res.status(400).json({message:"Captain already exists"});
        }

        const hashpassword=await captainModel.generatehashpassword(password);

        const newCaptain=await captainService.createCaptain({
            firstname:fullname.firstname,
            lastname:fullname.lastname,
            email,
            password:hashpassword,
            color:vehicle.color,
            plate:vehicle.plate,
            capacity:vehicle.capacity,
            type:vehicle.type
        });

        const token=newCaptain.generateAuthToken();

        res.cookie('token',token);
        res.status(201).json({newCaptain,token});
}

module.exports.loginCaptain=async (req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const {email,password}=req.body;

    const captain=await captainModel.findOne({email}).select('+password');
    if(!captain){
        return res.status(404).json({message:"Invalid credentials"});
    }

    const isMatch=await captain.comparePassword(password);
    if(!isMatch){
        return res.status(400).json({message:"Invalid credentials"});
    }

    const token=captain.generateAuthToken();

    res.cookie('token',token);
    res.status(200).json({captain,token});
}

module.exports.getProfile=async (req,res)=>{
    res.status(201).json(req.captain)
}

module.exports.logoutCaptain=async (req,res)=>{
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