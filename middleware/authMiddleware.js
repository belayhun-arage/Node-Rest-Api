const jwt=require('jsonwebtoken')
const User = require('../models/userModel')
const authUser=(req,res,next)=>{
    const tocken=req.cookies.jwt;
    if(tocken){
        jwt.verify(tocken,"secret-key",(err,decodedTocken)=>{
            if(err){
                console.log("failed to autenticate user")
            }else{
                console.log("User  authenticated true",decodedTocken)
                next()
            }
        })
    }else{
        console.log("failed to autenticate user")
    }
}

const currentUser=(req,res,next)=>{
    const tocken=req.cookies.jwt
    if(tocken){
        jwt.verify(tocken,"secret-key",async (err,decodedTocken)=>{
            if(err){
                res.locals.user=null
                next()
            }else{
                console.log(decodedTocken)
                const user=await User.findById(decodedTocken.id)
                res.locals.user=user
                next()
            }
        })
    }else{
        res.locals.user=null
        next()
    }
}

module.exports={authUser,currentUser};