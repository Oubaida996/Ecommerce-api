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

// ==== Connection with server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port  ${PORT}`);
  //==== Connect the DB
  dbConnection();
});
