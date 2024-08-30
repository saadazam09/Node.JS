var fs = require('fs');

// Write to file
fs.writeFile('hey.txt', 'i am good', function (err) {
  if (err) throw err;
  console.log('File written successfully');
});

// Append to file
fs.appendFile('hey.txt', ' what about you', function (err) {
  if (err) throw err;
  console.log('Data appended successfully');
});

// Rename the file
fs.rename('hey.txt', 'hello.txt', function (err) {
  if (err) throw err;
  console.log('File renamed successfully');
});

// Delete the file
fs.unlink('hello.txt', function (err) {
  if (err) throw err;
  console.log('File deleted successfully');
});
