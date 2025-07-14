const express=require('express');
const router=express.Router();
const {body}=require('express-validator');
const CaptainController=require('../controllers/captain.controller');
const { authCaptain } = require('../middlewares/auth.midlleware');

router.post('/register',[
    body('fullname.firstname').isLength({min:3}).withMessage('First name should be atleast 3 characters long'),
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({min:6}).withMessage('Password should be atleast 6 characters long'),
    body('vehicle.color').isLength({min:3}).withMessage('Color should be atleast 3 characters long'),
    body('vehicle.plate').isLength({min:3}).withMessage('Plate should be atleast 3 characters long'),
    body('vehicle.capacity').isInt({min:3}).withMessage('Capacity must be atleast 3'),
    body('vehicle.type').isIn(["taxi","moto","auto"]).withMessage('Choose valid vehicle type'),
],
  CaptainController.registerCaptain
)

router.post('/login',[
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({min:6}).withMessage('Password should be atleast 6 characters long'),
],
    CaptainController.loginCaptain
)

router.get('/profile',authCaptain,CaptainController.getProfile)
router.get('/logout',authCaptain,CaptainController.logoutCaptain)



module.exports=router;