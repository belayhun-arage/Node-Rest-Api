const multer = require('multer');
const path= require('path')
const Blog = require('../models/blogs')
// const {GridFsStorage} = require('multer-gridfs-storage');
// const Grid=require('gridfs-stream')
// const storage = new GridFsStorage({ url });

const blog_index=(req,res)=>{
    console.log("handling get request");
    Blog.find()
        .then(
            (result)=>{
                res.render('index',{blogs:result});
            }
        )
        .catch((err)=>{
            console.log(err);
        })
}

// define storage for images
const storage = multer.diskStorage({
    destination:function(request,file,callback){
        callback(null,'./public/Uploads/images')
    },
    //add back extension
    filename:function(request,file,callback){
        callback(null,Date.now()+file.originalname)
    }
    

})
// const upload = multer({ storage });
// uploading parameter 4 multer
const upload =multer({storage}).single("image")

const blog_create_get=(req,res)=>{
    res.render('create');
}

const blog_create_post= (req,res)=>{
    let blog = new Blog({
        title:req.body.title,
        snippet:req.body.snippet,
        discription:req.body.discription,
        img:req.file.filename,
    });
    blog.save()
        .then((result)=>{
            res.redirect('/blogs');
        })
    .catch((error)=>{
        console.log(error)
    })
}
const blog_details=async (req,res)=>{
    const id = req.params.id;
    await Blog.findById(id)
        .then((result)=>{
            res.render('details',{blog:result})        
        })
        .catch((err)=>{
            console.log(err);
        })
}
const blog_delete=(req,res)=>{
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
    .then(()=>{
        //this is the response for the ajax requist
        //in node we can't redirect rather we will respond json data back to the browser
        //that json data will have redirect property
        res.json({redirect : '/blogs'})
    }) 
    .catch((err)=>{
        console.log(err);
})
}

module.exports={
    blog_index,
    blog_create_get,
    blog_create_post,
    blog_delete,
    blog_details,
    upload
}
