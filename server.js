'use strict';
const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const ApiError = require('./utils/ApiErorr');
//=====Routes
const categoryRoutes = require('./routes/categoryRoutes');
const subCategoryRoutes=require('./routes/subCategoryRoutes');
const dbConnection = require('./config/database');
const globalErorrHandlingMidleware = require('./middleware/errorMiddleware');
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
app.use('/api/v1/subcategories', subCategoryRoutes);

/* 
=====
Handling Error
=====
*/

// If the route doesn't exist. Ex: /api/v2/categories the path of endpoint doesn't exist.
// '*' ==> meaning the unknown path/endpoint
app.all('*', (req, res, next) => {
  /*  
 //==== ancient way :(
//==> Create error and send it to error handling midleware.
  const err = new Error(`Cant find this route ${req.originalUrl}`);
  next(err.message); 
  */
  //=== Modern way :)
  next(new ApiError(`Cant find this rout ${req.originalUrl}`, 400));
});

// Global error handling middleware for express
app.use(globalErorrHandlingMidleware);

// ==== Connection with server
const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port  ${PORT}`);
  //==== Connect the DB
  dbConnection();
});

//Events ===> listen ===> emit
// @desc  Handle errors outside express unhandle rejections.
process.on('unhandledRejection', (err) => {
  console.error(`unhandledRejection : ${err.name} | ${err.message} `);
  server.close(() => {
    console.error('Shutting down .....');
    process.exit(1); //to stop app.
  });
});
