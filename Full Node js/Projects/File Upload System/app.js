const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

const app = express();

// Define the upload directory
const uploadDir = path.join(__dirname, 'public', 'images', 'uploads');

// Ensure the uploads directory exists
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir, { recursive: true }); // Create the entire folder structure if not exists
}

// Set up Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir); // Save files to the correct uploads folder
    },
    filename: function (req, file, cb) {
        crypto.randomBytes(12, (err, buffer) => {
            if (err) throw err;
            const uniqueID = buffer.toString('hex'); // Generate unique ID
            const ext = path.extname(file.originalname); // Get the file extension
            const filename = `${file.fieldname}-${uniqueID}${ext}`; // File name format
            console.log(`File uploaded with unique ID: ${uniqueID}`); // Log the unique ID to the terminal
            cb(null, filename); // Store the file with the generated name
        });
    }
});

const upload = multer({ storage: storage });

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Set view engine to EJS
app.set('view engine', 'ejs');

// Serve form
app.get("/", (req, res) => {
    res.render('test'); // Assumes you have a test.ejs in the views folder
});

// Handle file upload
app.post('/test', upload.single('file'), (req, res) => {
    const { name } = req.body;

    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    const uploadedFileUrl = `/images/uploads/${req.file.filename}`;
    const uniqueID = req.file.filename.split('-')[1].split('.')[0]; // Extract unique ID from filename

    // Show unique ID on terminal
    console.log(`File for ${name} uploaded with unique ID: ${uniqueID}`);

    // Send the response with a link to the uploaded file and unique ID
    res.send(`
        <p>File uploaded successfully!</p>
        <p>File Name: ${req.file.filename}</p>
        <p>Unique ID: ${uniqueID}</p>
        <p>Access the file <a href="${uploadedFileUrl}" target="_blank">here</a>.</p>
    `);
});



// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
// TELL ME YOUR THOUGHT