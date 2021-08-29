const mongoose=require("mongoose")
const userSchema=mongoose.Schema;
const {isEmail} = require("validator")
const bcrypt=require("bcryptjs")

const user = new userSchema({
    name:String,
    email:{
        type:String,
        required:true,
        unique:true,
       validator:[isEmail,"Please enter valid email"],
        lowercase:true,
        //match:/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
    },
    password:{
        type:String,
        required:true,
        minlength:[6,"Minimum password length is 6"]
    },
    // profileimage:String
})
//before the user is created
user.pre('save',async function(next){
    //Hash the user password
    const salt=await bcrypt.genSalt()
    this.password=await bcrypt.hash(this.password,salt)
    console.log("Before User created",this.password)
    next()
})
//aftere the user is saved
user.post('save',function(doc,next){
    
    next()
})

user.statics.login =async  function(email,password){
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


const model=mongoose.model("User",user);
module.exports=model;

