const mongoose=require('mongoose')
const userSchema=mongoose.Schema;
const {isEmail} = require("validator")
const bcrypt=require('bcrypt')
const user=new userSchema({
    firstName: String,
    lastName: String,
    company:String,
    email: {
        type:String,
        required:true,
        unique:true,
        validator:[isEmail,"Please enter valid email"],
    },
    password:{
        type:String,
        required:true,
        minlength:[6,"Minimum password length is 6"]
    },
    roles: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Role",
          default:"User"
        }
      ],
    events: [
        { 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Event' 
        }
      ],
    
})

user.statics.login =async function(email,password){
    const user = await this.findOne({email});
    const salt=await bcrypt.genSalt()
    if(user ){
        const auth=await bcrypt.compare( password , user.password )
        if(auth){
            return user
        }
        throw Error("incorrect password")
    }
    throw Error("Incorrect email")
}
const userModel=mongoose.model("User",user)
module.exports=userModel