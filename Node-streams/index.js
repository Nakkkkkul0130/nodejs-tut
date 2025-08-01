const express = require('express');
const fs = require('fs');

const status = require('express-status-monitor');
const zlib = require('zlib');
const app = express();

const port = 8000;

app.use(status());

// Compressing a file using zlib
fs.createReadStream("./sample.txt").pipe(zlib.createGzip()).pipe(fs.WriteStream("./sample.txt.gz"));

app.get('/',(req,res)=>{
    // fs.readFile("./sample.txt", 'utf8', (err, data) => {
    //     if (err) {
    //         console.error("Error reading file:", err);
    //         res.status(500).end("Internal Server Error");
    //         return;
    //     }
    //     res.end(data);
    // });

    // Using streams to read the file
    const stream = fs.createReadStream('./sample.txt','utf-8');
    stream.on('data', (chunk)=> res.write(chunk));
    stream.on('end', () => res.end());
})

app.listen(port,()=> console.log(`Server is running on port ${port}`));
