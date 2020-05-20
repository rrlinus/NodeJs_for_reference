// const basic_module_nodejs=require('./basicmodule/')
const fs=require('fs');
const path=require('path')
const http=require('http');
const api=require('./API/members.js') 
const server=http.createServer((req,res)=>{
    // if(req.url=='/'){
    //     res.writeHead(200,{'content-Type':'text/html'})
    //     fs.readFile(path.join(__dirname,'public','index.html'),'utf8',(err,data)=>{
    //         res.end(data)
    //     })
    // }
    // if(req.url=='/css/style.css'){
    //     res.writeHead(200,{'content-Type':'text/css'})
    //     fs.readFile(path.join(__dirname,'public','/css/style.css'),'utf8',(err,data)=>{
    //         res.end(data)
    //     })
    // }
    // if(req.url=='/about'){
    //     res.writeHead(200,{'content-Type':'text/html'})
    //     fs.readFile(path.join(__dirname,'public','about.html'),'utf8',(err,data)=>{
    //         res.end(data)
    //     })
    // }
    // if(req.url=='/api/members'){
    //     res.writeHead(200,{'content-Type':'application/json'})
    //         res.end(JSON.stringify(api))
    // }
    const pathFile=path.join(__dirname,'public',req.url=='/'?'index.html':req.url)
    const extension=path.extname(pathFile);
   let contentType='text/html'
    switch(extension){
        case '.js':
            contentType='text/javascript';
            break;
        case '.css':
            contentType='text/css';
            break;
        case '.json':
            contentType='application/json'
            break;
        case '.png':
            contentType='image/png'
            break;
        case 'jpg':
            contentType='image/jpg'
    }
    res.writeHead(200,{'content-Type':contentType})
    fs.readFile(pathFile,'utf8',(err,data)=>{
        if(err){
            if(err.code==='ENOENT'){
                fs.readFile(path.join(__dirname,'public','404.html'),'utf8',(err,data)=>{
                    res.writeHead(200,{'content-Type':'text/html'})
                    res.end(data);
                })
            }
            else{
                res.writeHead(500);
                res.end(`Server Error ${err.code}`)
            }
        }
        else{
        res.writeHead(200,{'content-Type':contentType});
        res.end(data)
        }
    })
    
})
// console.log(api)
let PORT=process.env.PORT || 5000
server.listen(PORT,()=>{
    console.log("Server...")
})
