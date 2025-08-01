const express  = require("express");
const http = require("http");

const path = require("path");
const app = express();
const { Server } = require("socket.io");

const server = http.createServer(app);

const io = new Server(server);  // Create a new instance of Socket.IO

io.on("connection",(client)=>{          // Listen for a new connection, client is the socket object for the connected user which have info about the user
    client.on("chat message",msg=>{
        console.log("message: " + msg);
        io.emit("chat message", msg); // Emit the message to all connected clients
    })
});

// app.use(express.static("/public")); // this gives error because it is absolute path, from root of the file system

//app.use(express.static("public")); // this serves static files from the public directory
// but use this everytime

app.use(express.static(path.resolve("./public"))); // this serves static files from the public directory using absolute path

app.get("/",(req,res)=>{
    res.sendFile("./public/index.html");
})

server.listen(9000,()=> console.log(`Server is running on port 9000`));

