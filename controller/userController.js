require('dotenv').config()
var jwt = require('jsonwebtoken');
const multer = require('multer');
const path= require('path');
const User = require('../models/users')
const bcrypt= require('bcryptjs')
var nodemailer = require('nodemailer');

const maxAge= 3 * 24 * 64 * 64;
const createTocken=(id)=>{
    return jwt.sign({id},"secret-key",{expiresIn:maxAge})
}

//user routes
const home_Page=(req,res)=>{
    //TO DO!!!
}
const user_SighnUp_get=(req,res)=>{
    res.render('sighnup')
}
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'belayhun24arage@gmail.com',
      pass: 'henonsolomon'
    }
  });
const user_SighnUp_Post= async (req,res)=>{
    const {name,email,password}=req.body
    try{
        const user = await User.create({name,email,password});
        if(user){
            const usrEmail=user.email
            console.log(usrEmail,"Emaillllllllllllllllllllllllll")
            await transporter.sendMail({
                from: 'belayhun24arage@gmail.com',
                to: usrEmail,
                subject: 'Sending email to new user account',
                text: `thank you for signing app`
              }, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });
        const tocken=createTocken(user._id)
        console.log("New user ID:",user._id)
        res.cookie('jwt',tocken,{httpOnly:true,maxAge:maxAge*1000})
        res.status(201).json({user:user._id})   
        }}catch(err){
            // const errors = handleErrors(err);
            res.status(400).json({ err });
        };
}
                    
const user_SighnIn_Get=(req,res)=>{
    res.render('sighnin')
}

//   var mailOptions = {
//     from: 'belayhun24arage@gmail.com',
//     to: 'dessademe16@gmail.com',
//     subject: 'Sending email to new user account',
//     text: `thank you for signing app`
//   };
const user_SighnIn_Post=async (req,res,next)=>{
    const {email,password}=req.body;
    try{
        const user = await User.login(email,password)

            const tocken=createTocken(user._id)
            res.cookie('jwt',tocken,{httpOnly:true,maxAge:maxAge*1000})
        

        // res.status(200).json({user:user._id})
        // console.log("this is the tocken from the server to be sent to the client",tocken)
        
    }catch(err){console.log(err)}       
    }
const user_SighnOut_get=(req,res)=>{
    res.cookie('jwt','empty-key',{maxAge:1})
    res.redirect('/')
}
const user_profile=async (req,res)=>{
    const id = req.params.id;
    await User.findById(id)
        .then((result)=>{
            res.render('mypp',{user:result})        
        })
        .catch((err)=>{
            console.log(err);
        })
}

module.exports={
    user_profile,
    user_SighnUp_get,
    user_SighnUp_Post,
    user_SighnIn_Get,
    user_SighnIn_Post,
    user_SighnOut_get
}