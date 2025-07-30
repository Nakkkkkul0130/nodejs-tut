const math = require('./module.js');

console.log(math.add(5, 3));            // Output: 8
console.log(math.sub(10, 4));           // Output: 6

// if directly want to use add, sub function then
// const { add, sub } = require('./module.js');
// console.log(add(5, 3));            // Output: 8
// console.log(sub(10, 4));           // Output: 6
