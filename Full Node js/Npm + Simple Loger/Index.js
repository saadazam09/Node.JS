// What is Npm

// the Worlds largest Software Register (library) 
// the rigister contains Over 800k Code package
// open Source Developer Used Npm to shere Software

// Why we use 
// Npm Already Created By someone Let Sy You wanted Text To Speach Features in your Website
// if you started It takes Month to year build those But Its already Created By Google Package name 

//TO Install go npm Package Website And Search It give you Install package name you have to type in terminal

// Lets Created A Very Simple Loger Node js Project 

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Define the log file path
const logFilePath = path.join(__dirname, 'log.txt');

// Function to format the current timestamp
function getTimeStamp() {
    const now = new Date();
    return `${now.toISOString()}`;
}

// Function to log a message to the log file
function logMessage(message) {
    const timeStampedMessage = `[${getTimeStamp()}] ${message}\n`;

    // Append the message to the log file
    fs.appendFile(logFilePath, timeStampedMessage, (err) => {
        if (err) {
            console.error('Failed to write to log file:', err);
        } else {
            console.log('Message logged:', timeStampedMessage.trim());
        }
    });
}

// Create an interface for reading user input from the command line
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Ask the user for their email
rl.question('Enter your email: ', (email) => {
    // After getting the email, ask for the password
    rl.question('Enter your password: ', (password) => {
        // Log the email and password (for demonstration purposes; never log passwords in real applications)
        logMessage(`User email: ${email}`);
        logMessage(`User password: ${password}`);
        
        // Log the "Unable to connect to database" message
        logMessage('Error: Unable to connect to the database');
        
        // Close the readline interface
        rl.close();
    });
})
