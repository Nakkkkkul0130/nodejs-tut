//--------------creating a http web server

const http = require('http');
const fs = require('fs');
const url = require('url');
const express = require('express');
const { parse } = require('path'); 

const app = express(); // create an instance of express and with the help of app
app.get('/', (req, res) => { // we can use app.get() to handle GET requests
    return res.send('<h1>Welcome to the Home Page</h1>'); // send response to client
});
app.get('/about', (req, res) => { // handle GET request for /about
    res.send('hi from about page'+' hey'+req.query.myname); // send response to client req.query.myname is used to get query parameter from url
    // http://localhost:8000/about?myname=nakul
});


// const myServer = http.createServer((req,res) => {       //creates server and take two arguement as req which is object and stores all client side req
//     console.log("req receivd");
//     res.end("hello from server");
// });

/*
function myhandler(req, res) {
const log = `${Date.now()}:${req.method} ${req.url} new request received\n`;
    if(req.url === '/favicon.ico') {
        res.writeHead(204); // No Content
        return res.end();
    }
    const parsedUrl = url.parse(req.url, true);             // parse the URL and query string
    console.log(parsedUrl);
    fs.appendFile('log.txt', log, (err) => {
        switch(parsedUrl.pathname) {
            case '/':
                res.end('<h1>Welcome to the Home Page</h1>');
                break;
            case '/about':
                const username = parsedUrl.query.myname;    // extract query parameter 'myname' so that we can see on response
                res.end(`Hii ${username}`);
                break;
            default:
                res.end('<h1>Page Not Found</h1>');
        }
    });
}
*/

/*
const myServer = http.createServer(app);
*/

//but here comes issue like lot of cases for each path and then if,else,if,else for http methods, issue at 
//production level, so we need to use some framework like express.js

// we need port to run server

/*
myServer.listen(8000, ()=> console.log('server started'));
*/


// if you use express.js then you don't need to use http.createServer() as express.js already creates a server for you
app.listen(8000, () => console.log('server started'));
