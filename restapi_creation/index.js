const express = require('express');
const app = express();
const mongoose = require('mongoose');
const fs = require('fs');
const users = require('./MOCK_DATA.json');
const port = 8000;


// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/database1')
.then(()=>console.log("Connected to MongoDB"))
.catch((err)=>console.log("Error connecting to MongoDB", err));


//Schema
const userSchema = new mongoose.Schema({
    firstname : {
        type: String,
        required: true
    },
    lastname : {
        type: String,
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    job_title : {
        type: String,
    },
    gender : {
        type: String,
    },


}) 
const User = mongoose.model('user', userSchema); // Create a model from the schema
// now using this User model we can do CRUD operations

//Middleware - plugins
app.use(express.urlencoded({extended:false})); // jb bhi form data aayega usko body mein add krega

app.use((req, res, next) => {
    console.log("hello from middleware");
    next(); // Call the next middleware in the stack
});
// you can create multiple middlewares.

app.get('/users', (req, res)=>{
    const html = `
    <ul>
    ${users.map(user => `<li>${user.first_name} ${user.last_name}</li>`).join('')}
    </ul>
    `
    res.send(html);                // Respond with the users data as HTML format
});

// REST API
app.get('/api/users', (req,res)=>{
    res.setHeader("X-MyName","nakul");        // custom header
    //always use x to create custom headers

    return res.json(users);                // Respond with the users data as json format
});


app.get('/api/users/:id', (req, res) => {
    const id  = req.params.id;          // Extract the id from the request parameters, currently it is a string
    // Convert the id to an integer and find the user with that id
    // Note: The id in the MOCK_DATA.json is a string, so we need to
    // convert it to an integer for comparison
    const user  = users.find(user => user.id === parseInt(id)); // Find the user with the given id

    res.json(user);              // Respond with the user data as json format
});


app.post('/api/users', async(req, res) => {          //for database we use async-await
    const body = req.body;
    if(!body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title) { // Check if the required fields are present
        return res.status(400).json({ status: "error", message: "Please provide all fields" }); // Respond with an error if any field is missing
    }

    //console.log(body); // Log the request body to the console

    // users.push({...body, id: users.length + 1}); // Add the new user to the users array
    // fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => { 
    //     return res.status(201).json({ status: "success", data: body }); // Write the updated users array to the MOCK_DATA.json file
    // });

    const result = await User.create(
        {
            firstname: body.first_name,
            lastname: body.last_name,
            email: body.email,
            job_title: body.job_title,
        }
    );
    console.log("result",result); // Log the result of the database operation to the console
    return res.status(201).json({status:"success",data: result}); // Respond with the created user data


});

app.patch('/api/users/:id', (req, res) => {
    return res.json({ status:"pending"});
});

app.delete('/api/users/:id', (req, res) => {
    return res.json({ status:"pending"});
});



app.listen(port, ()=> console.log(`Server is running on port ${port}`));

// these all are in same file is not a good practice, so we create a folder for model,views,controllers, routes and just import that file
// in our index.js file
// and use that file
// this is called MVC architecture
// Model - for database operations