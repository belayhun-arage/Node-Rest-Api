const multer=require('multer')

//define storage for images
const storage = multer.diskStorage({
    destination:function(request,file,callback){
        callback(null,'./public/Uploads')
    },
    //add back extension
    filename:function(request,file,callback){
        callback(null,Date.now()+file.originalname)
    }
})
//uploading parameter 4 multer
const upload =multer({
    storage:storage,
    limits:{
        fieldSize:1024 * 1024 *6
    }

}).single("image")

module.exports={upload}