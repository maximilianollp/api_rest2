




// const express = require('express')  
//impostar algon en Node

// importar dotenv 
const Server=require('./models/server')
require('dotenv').config();

const server = new Server();

server.listen();

// const app = express() 

// app.get('/', function (req, res) { 
  // res.json({msg:'Hello World'}) 
  // res.send("Hola Mundo"); 
// }) 

// app.listen(process.env.PORT,()=>{
//     console.log("server online port:", process.env.PORT);


// } )
