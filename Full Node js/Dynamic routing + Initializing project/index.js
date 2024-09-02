const express = require('express');
const app = express();
const path = require('path')

app.use(express.json());
app.use(express.urlencoded({extended: true}))
//so inshilaizi Are project What the meaingof this express.static path so So we are Giveing Them Path Where it can Intract with Front End 
app.use(express.static(path.join(__dirname, 'public')))

// We Download ejs What is ejs it type of Html like In html we have <h1> 2+2 <h1/> we cant calculate in ejs we have power to calculte 
//Like this   <p>The result of 2 + 2 is: <%= result %></p>

app.set('view engine', 'ejs')

app.get('/' , function(req , res){
    res.send('chal rh hai')
})

//to making dynamic We Have Ad : before route
app.get('/profile:username' , function(req , res){
    res.send(`welcome,${req.params.username}`)
})

app.listen(3000 , function(){
    console.log("its runing")
}) 