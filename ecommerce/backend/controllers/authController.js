const User = require('../models/user');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

const sendToken = require('../utils/jwtToken');

const cloudinary =require('cloudinary')
// Register a user => /api/v1/register
exports.registerUser = catchAsyncErrors( async(req,res,next)=>{

    const result = await cloudinary.v2.uploader.upload(req.body.avatar,{
        folder:'avatars',
        width:150,
        crop:"scale"
    })
    const {name,email,password} = req.body;

    const user =await User.create({
        name,
        email,
        password,
        avatar:{
            // public_id:'avatars/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail',
            // url:'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png'
            public_id:result.public_id,
            url:result.secure_url
        }
    })
   sendToken(user,200,res)
})

// Login User
exports.loginUser = catchAsyncErrors(async(req,res,next)=>{
    const {email,password}=req.body;

    //Checks if email and password is entered by user
    if(!email || !password){
        return next(new ErrorHandler('Please enter email & password',400))
    }

    // Finding user in database
    const user = await User.findOne({email}).select('+password')

    if(!user) {
        return next(new ErrorHandler('Invalid Email or Password',401));
    }

    // Checks if password is correct or not
    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched) {
        return next(new ErrorHandler('Invalid Email or Password',401));
    }
    sendToken(user,200,res)
})

// Logout user
exports.logout = catchAsyncErrors(async(req,res,next)=>{
    res.cookie('token',null,{
        expires:new Date(Date.now()),
        httpOnly:true
    })

    res.status(200).json({
        success:true, 
        message:'Logged out'
    })
})