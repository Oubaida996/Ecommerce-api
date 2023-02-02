'use strict';
const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
//=====Routes
const categoryRoutes = require('./routes/categoryRoutes');
const dbConnection = require('./config/database');
dotenv.config({ path: 'config.env' });

// express app
const app = express();

// Middlewares
app.use(express.json()); // we parse the data within body request from string into json

//==== Check The Mode Of Enviroments
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('tiny'));
  console.log(` Mode : ${process.env.NODE_ENV} `);
}

//==== Mount Routes

app.use('/api/v1/categories', categoryRoutes);

/* 
=====
Handling Error
=====
*/

// If the route doesn't exist. Ex: /api/v2/categories the path of endpoint doesn't exist.
// '*' ==> meaning the unknown path/endpoint 
app.all('*',(req,res,next)=>{
  // Create error and send it to error handling midleware.
  const err =new Error(`Cant find this rout ${req.originalUrl}`);
  next(err.message);
} )

// Global error handling middleware
app.use((err, req, res, next) => {
  res.status(400).json({ err });
});

// ==== Connection with server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port  ${PORT}`);
  //==== Connect the DB
  dbConnection();
});
