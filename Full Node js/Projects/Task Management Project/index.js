const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

const filesDir = path.join(__dirname, 'files'); // Directory for storing the file
const tasksFilePath = path.join(filesDir, 'task.txt'); // Path to the task.txt file

// Check if the directory exists or not
if (!fs.existsSync(filesDir)) {
    fs.mkdirSync(filesDir);
}

function readTasksFromFile() {
    try {
        if (fs.existsSync(tasksFilePath)) { // Check if the file exists
            const data = fs.readFileSync(tasksFilePath, 'utf-8'); 
            return JSON.parse(data); // Return the data from file
        }
        return []; 
    } catch (error) { // Catch any errors and print a message
        console.error('Error reading tasks from file:', error);
        return [];
    }
}

// Function to write tasks to the file
function writeTasksToFile(tasks) {
    try {
        fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2)); // Write JSON data to file
    } catch (error) {
        console.error('Error writing tasks to file:', error);
    }
}

let tasks = readTasksFromFile(); // Load tasks from file on startup

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index', { files: tasks }); // Render the EJS template with tasks
});

// POST route to create a new task
app.post('/create', (req, res) => {
    const { detail, body } = req.body;
    const newTask = { detail, body };

    tasks.push(newTask); // Add the new task to the tasks array
    writeTasksToFile(tasks); // Save tasks to file

    res.redirect('/'); // Redirect to home to display updated tasks
});

// GET route to read a specific task
app.get('/readmore/:index', (req, res) => {
    const taskIndex = parseInt(req.params.index, 10);

    // Check if the index is valid
    if (taskIndex >= 0 && taskIndex < tasks.length) {
        const task = tasks[taskIndex];
        res.render('show', { task }); // Render the show.ejs template with the selected task
    } else {
        res.redirect('/'); // Redirect if the index is out of bounds
    }
});

// DELETE route to remove a task
app.post('/delete/:index', (req, res) => {
    const taskIndex = parseInt(req.params.index, 10);

    // Check if the index is valid
    if (taskIndex >= 0 && taskIndex < tasks.length) {
        tasks.splice(taskIndex, 1); // Remove the task from the tasks array
        writeTasksToFile(tasks); // Save the updated tasks array to the file
    }

    res.redirect('/'); // Redirect to home after deletion
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
