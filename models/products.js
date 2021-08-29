const mongoose=require('mongoose')
const productSchema = mongoose.Schema

const product=new productSchema({
    productName:{
        typeof:String,
        required:true
    },
    productCode:{
        typeof:String,
        required:true,
        uniquie:true
    },
    sellingPrice:String,
    image:String
})

const productModel=mongoose.model("Products",product)
module.exports=productModel