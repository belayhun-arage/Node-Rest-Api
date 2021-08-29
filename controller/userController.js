const User = require('../models/userModel')
const Role=require('../models/role')
var jwt = require('jsonwebtoken');
const bcrypt=require('bcrypt')
const maxAge= 3 * 24 * 64 * 64;
const createTocken=(id)=>{
    return jwt.sign({id},"secret-key",{expiresIn:maxAge})
}


const createAccount=async (req,res)=>{
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        company:req.body.company,
        password: bcrypt.hashSync(req.body.password,await bcrypt.genSalt())
      });
      try{ 
        await user.save((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            if (req.body.roles) {
                Role.find({name: { $in: req.body.roles }},
                (err, roles) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }
                    user.roles = roles.map(role => role._id);
                    user.save(err => {
                        if (err) {
                            res.status(500).send({ message: err });
                            return;
                        }else{
                            const tocken=createTocken(user._id)
                            res.cookie('jwt',tocken,{httpOnly:true,maxAge:maxAge*1000})
                            res.status(201).json({user:user._id}) 
                            console.log("tocken-created",tocken)
                            res.send({ id:user._id });
                        }

              });
            });
            }else{Role.findOne({ name: "user" }, (err, role) => { 
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                user.roles = [role._id];
                user.save(err => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }else{
                    const tocken=createTocken(user._id)
                    res.cookie('jwt',tocken,{httpOnly:true,maxAge:maxAge*1000})
                    res.status(201).json({user:user._id}) 
                    console.log("tocken-created",tocken)
                }
                });
            });}
        })
    }catch(err){console.log(err)}  
}


const regiterForHackaton=(req,res)=>{

}
const arrangePersonalMeeting=(req,res)=>{}


const getUserById=async (req,res)=>{
    try{
        await User.findById(req.params.userId)
        .then((result) => {
            res.status(200).send(result);
            
        });
    }catch(err){console.log(err)}
}
const getAllUser=async (req,res)=>{
    User.find()
    .then(
        (result)=>{
            res.status(200).json(result)
        }
    )
    .catch((err)=>{
        console.log(err);
    })
}
// const updateUser=async (req,res)=>{
//     const userData=req.body
//     const filter= { email: userData.email };
//     try{
//         const user=await User.authUser(userData.email,userData.password)
//         if(user){
//             await User.findOneAndUpdate(filter,userData,{new:true})
//                     .then((result) => {
//                         res.status(204).send(result); 
//                         console.log("User profile update!")
//                     });
//         }
//     }catch(err){console.log(err)}
// }
const deleteUser=async(req,res)=>{
    try{
        await User.findOneAndRemove({ _id:req.params.userId })
    }catch(err){res.status(400).json(err)}
}

const usersEvent=async (req,res)=>{
    try{
        const users = await User.find().populate('events');
        res.send(users);
    }catch(err){res.status(400).json(err)}
}

const userLogIn=async (req,res)=>{
    const {email,password}=req.body;
    try{
        const user = await User.login(email,password)
        if(user){
            const tocken=createTocken(user._id)
            res.cookie('jwt',tocken,{httpOnly:true,maxAge:maxAge*1000})
            res.status(200).json({user:user._id,tocken})
        }
    }catch(err){console.log(err)} 
}

const userLogOut=async (req,res)=>{
    res.cookie('jwt','empty-key',{maxAge:1})
    res.status(400).json("Successfully logged out")
}

module.exports={
    createAccount,
    getUserById,
    getAllUser,
    deleteUser,
    usersEvent,
    userLogIn,
    userLogOut
}




  