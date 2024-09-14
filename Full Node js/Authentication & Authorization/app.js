// Authentication & Authorization

//user lo prfile dyny sy phely ya check karna hota have checked who is uer - Authorization 

// Authorized to perform task which ar only allowed to be executed by admin

//Process like we you send req to server that give a profile it ask who are you tell that i am Saad it give a Profle If ask like the it says 
//again who are you You have say that i am saad Server every time forget who is give req 

// Here Comes Cokie and sesion that i already Cover 

//How To Set Cokie
const express = require('express');
const app = express();
const bcrypt = require('bcryptjs');


// Route to set a cookie
app.get("/", (req, res) => {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash("hiIamPassword", salt, function(err, hash) {
        console.log(hash)
        });
    });
});


// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
