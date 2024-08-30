//Remove the File 


fs.unlink('hello.txt', function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log("File removed");
  }
});