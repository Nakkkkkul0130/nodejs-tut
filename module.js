function add(a, b) {
  return a + b;
}

function sub(a, b) {
  return a - b;
}
//module.exports = add;

// exporting this add function to public so that it can be used in other files but first 
// u also have to import this file in other files using require function

// module.exports = sub;

 // now add function will override , u can create an object 
// and export multiple functions
// or u can use module.exports = { add, sub }; to export multiple functions


//----------------so use 

module.exports={
  add,
  sub
}


// also do like this
// exports.add = (a, b) => a + b;      // this is anonymous function , add is propeerty here