const mongoose=require('mongoose')
const customerSchema=mongoose.Schema;
const {isEmail} = require("validator")

const customer=new customerSchema({
    firstName: String,
    lastName: String,
    company:String,
    email: {
        type:String,
        required:true,
        unique:true,
        validator:[isEmail,"Please enter valid email"],
    },
    bussinessSector:{
        type:String,
        default:null,
        enum:["Day care","High school","Universty","Polytechnic","Art"]
    },
    profession:{
        type:String,
        default:null,
        enum:["Head","Student","Universty teacher","Special teacher","Other"]
    },
    role: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role"
          }
      ,
    
})

const customerModel=mongoose.model("Customer",customer)
module.exports=customerModel