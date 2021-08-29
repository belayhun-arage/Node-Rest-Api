const express = require('express');
const ejs = require('ejs');
const logger = require('morgan');
const mongoose = require('mongoose');
const { result } = require('lodash');
const blogRouter = require('./routes/blogRoutes.js')
const userRouter = require('./routes/userRoutes.js')
const authMiddleware=require('./middlware/authMiddleware')
const cookieParser=require('cookie-parser')
const connections=require('./connection')


console.log("starting express framework");
const app = express();

//register view engine
//app.set('view engine','ejs');
app.set('view engine', 'ejs');

const uri = "mongodb://localhost/newmongodb"
mongoose.connect(uri,{ useNewUrlParser: true,useUnifiedTopology: true  })
.then((result)=>{
    app.listen(3000);
}).catch((err)=>{
        console.log(err)
})
mongoose.connection.once('open',function(err){
    console.log(err)}
).on('error',function(err){
    console.log(err)
})

//serving static files
app.use(express.static('public'))
app.use(cookieParser())

//logging 
app.use(logger('tiny'))
 
//to accept data from client as json use the following middleware
app.use(express.json())

app.listen(3000,"localhost")

console.log("handling request:")
app.use('/blogs',authMiddleware.authUser,blogRouter);
app.use('/users',userRouter)
app.get('/',(req,res)=>{res.render('sighnin')})



// app.get('/set-cookie',(req,res)=>{
//     // res.setHeader('Set-Cookie','newuser true')
//     res.cookie('newUsr',false)
//     res.cookie('isUser',true)

//     res.send("u have got the cookie")
// })

// app.get('/read-cookies',(req,res)=>{
//     const usrCookies=req.cookies;
//     console.log(usrCookies)
//     res.json(usrCookies)
// })

app.use((req,res)=>{
    res.render('404');
})
// MongoClient.connect(uri, function(err, client) {
//    if(err) {
//         console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
//    }
//    console.log('Connected...');
//    const collection = client.db("test").collection("devices");
//    // perform actions on the collection object
//    client.close();
// });

//middleware
// app.use((req,res,next)=>{
//     console.log('method',req.method)
//     console.log("path",req.path)
//     console.log('host',req.hostname)
//     next()
// })

//how to serve static files like css and images



//getting and saving data---start transaction
// app.get('/add-blog',(req,res)=>{
    
//     //create new blog
//     const blog = new Blog({
//         title : "new blog",
//         snippet : "new snnipet",
//         body : "more about the new blog"
//     });

//     //save the new blog to the database
//     blog.save()
//         .then((result)=>{
//              res.send(result);
//         }).catch((err)=>{
//             console.log(err);
//         });
// })

// //retrieve all data from the database
// app.get('/all-blogs',(req,res)=>{
//     Blog.find()
//         .then((result)=>{
//             res.send(result);
//         })
//         .catch((err)=>{console.log(err);})
// })

// //retrieve single blog from the database
// app.get('/single-blog',(req,res)=>{
//     Blog.findById('60f111742643d324c4ee4dbb')
//         .then((result)=>{
//             res.send(result);
//         })
//         .catch((err)=>{console.log(err);})
// })

//redirection
// app.get('./about-me',(req,res)=>{
//     res.redirect('./about')
// })