const express=require('express');
const router=express.Router();
const {body}=require('express-validator');
const UserController=require('../controllers/user.controller');
const {authUser}=require('../middlewares/auth.midlleware')


router.post('/register',[
    body('fullname.firstname').isLength({min:3}).withMessage('First name should be atleast 3 characters long'),
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({min:6}).withMessage('Password should be atleast 6 characters long'),
],
  UserController.registerUser
);

router.post('/login',[
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({min:6}).withMessage('Password should be atleast 6 characters long'),
],UserController.loginUser);


router.get('/profile',authUser,UserController.getProfile)
router.get('/logout',authUser,UserController.logoutUser)

module.exports=router;