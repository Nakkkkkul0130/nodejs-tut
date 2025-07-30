const fs = require('fs');
// sync...

fs.writeFileSync("./text.txt", "Hello World!"); // creates a file if it doesn't exist, or overwrites it if it does
// async...

fs.writeFile('./text.txt', 'Hello World! async', (err) => {}); // creates a file if it doesn't exist, or overwrites it if it does, asynchronously
// override value in text.txt file with hello world async now

// ----------------read file
const data = fs.readFileSync('./luv.txt', 'utf-8'); // read file synchronously
console.log(data);

// ----------------read file async
fs.readFile("./luv.txt",'utf-8',(err,data)=>{
    if(err){
        console.log(err);
    } else {
        console.log(data); // prints the content of luv.txt
    }
});

// async not return anything and sync return as const data fer return value store in data

// ----------------append file
fs.appendFileSync('./luv.txt', 'jaat'); // appends text to the file, if it doesn't exist, it creates it
