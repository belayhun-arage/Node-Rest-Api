const http = require('http');
const fs = require('fs');

const _=require('lodash');

const server =http.createServer((req,res)=>{
    // console.log(req.url,req.method)

    const random_num=_.random(0,5);
    console.log(random_num);

    var path = './views';
    switch(req.url){
        case '/':
            path += '/index.ejs'
            break;
        case '/about':
            path += '/about.html'
            break;
        case '/about-me':
            res.statusCode=301;
            res.setHeader('Location','/about');
            res.end();
            break;
        default:
            path += '/404.html'
    }
    
    res.setHeader('Content-Type','text/html');
    const reader = fs.readFile(path,(err,data)=>{
        if(err){
            console.log(err);
        }
        res.write(data);
        res.end();
    })

});

server.listen(3000,'localhost',()=>{
    console.log('Server listening to port 3000')
})