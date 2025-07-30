const fs = require('fs');

const os = require('os'); // module in nodejs for finding your computer information

console.log(os.platform()); // win 32
console.log(os.cpus().length); // number of cpu cores

console.log('1');
const data = fs.readFileSync('./text.txt', 'utf8');
console.log(data);
console.log('2');

//output:
// 1
// content of file.txt
// 2

//-------------but in case of async----------------

console.log('1');
fs.readFile('./text.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(data);
});
console.log('2');
console.log('3');
console.log('4');

//output:
// 1
// 2
// 3
// 4
// content of file.txt
// Note: The output order may vary based on the file read operation timing.
// The asynchronous readFile function does not block the execution of the code that follows it.

