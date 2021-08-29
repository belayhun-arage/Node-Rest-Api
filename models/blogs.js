const mongoose = require('mongoose');
const blogSchema = mongoose.Schema;

//Schema definition
const blogs =new blogSchema(
    {
        // _id: mongoose.Schema.Types.ObjectId,
        title: String,
        snippet: String,
        discription: String,
        img:String
        
    }
);

//creating the model
//Blog--the name of the collection that will contain the documents
//blogs--the above defined schema 
const model = mongoose.model('Blog',blogs);

//in order to use the defined model any where we need to export it
module.exports = model;
