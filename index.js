const http=require("http");

const express=require('express');
const app=express();
const path=require('path')
const {Server}=require('socket.io');

const server=http.createServer(app);
const io=new Server(server);
// socket.io
io.on('connection' , (client)=>{
    // console.log('Client connected' , client.id);
    client.on('chatMessage' , (message)=>{
        // console.log('A new message' , message)
        io.emit('serverMessage' , message);
    })
})


const PORT=process.env.PORT||8000;
app.use(express.static('./public'));

app.get('/' , (req , res)=>{
    return res.sendFile("./public/index")
})

server.listen(PORT , ()=>console.log("Server started at PORT:" , PORT));