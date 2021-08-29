const jwt=require('jsonwebtoken')
const User = require('../models/users')
const authUser=(req,res,next)=>{
    const tocken=req.cookies.jwt;
    console.log("this is the tocken received from the server:",tocken)
    if(tocken){
        jwt.verify(tocken,"secret-key",(err,decodedTocken)=>{
            if(err){
                res.redirect('/users/sighnin')
            }else{
                console.log(decodedTocken)
                next()
            }
        })
    }else{
        res.redirect('/users/sighnin')
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