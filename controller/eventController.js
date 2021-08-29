const Event = require('../models/eventModel')

const postEvent=async (req,res)=>{
    const {title,type,eventDate}=req.body
    try{
        const event=await Event.create({title,type,eventDate})
        if(event){
            res.status(200).json(event)
        }
    }catch(err){res.status(400).json(err)}
}


const searchEventByName=(req,res)=>{
    const name=req.params.name
    try{
        const event=Event.findOne({name})
        if(event){
            res.status(200).json(event)
        }
    }catch(err){res.status(400).json("Bad Request")}
}
const searchEventByDate=(req,res)=>{
    const date=req.params.date
    try{
        const event= Event.findOne({date})
        if(event){
            res.status(200).json(event)
        }
    }catch(err){res.status(400).json(err)}
}
const getAllEvents=(req,res)=>{
    Event.find()
    .then(
        (result)=>{
            res.status(200).json(result)
        }
    )
    .catch((err)=>{
        res.status(400).json(err)
    })
}
// const updateEvent=(req,res)=>{
//     const eventData=req.body
//     const filter= { name: userData.name };
//     try{
//         const user=await User.authUpdate(userData.email,userData.password)
//         if(user){
//             await User.findOneAndUpdate(filter,userData,{new:true})
//                     .then((result) => {
//                         res.status(204).send(result); 
//                         console.log("User profile update!")
//                     });
//         }
//     }catch(err){console.log(err)}
// }
const deleteEvent=(req,res)=>{

}

module.exports={
    postEvent,
    searchEventByName,
    searchEventByDate,
    getAllEvents,
    deleteEvent,
}