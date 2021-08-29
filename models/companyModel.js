const mongoose=require('mongoose')
const companySchema=mongoose.Schema;
const {isEmail} = require("validator")

const company=new companySchema({
    name: String,
    bussinessEmail: {
        type:String,
        required:true,
        unique:true,
        validator:[isEmail,"Please enter valid email"],
    },
    bussinesPhone: {
        type:String,
        unique:true,
        required:true
    },
    location:String,
    website:String,
    city:String,
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
  ,
})

const companyModule=mongoose.model("Company",company)
module.exports=companyModule