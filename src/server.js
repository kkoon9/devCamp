const express = require("express");
const dotenv = require("dotenv");
const morgan = require('morgan');
const colors = require('colors');
const errorHandler = require('./middleware/error');
const connectDB = require('../config/db');

dotenv.config({ path: './config/config.env' });

// Connect to database
connectDB();

// Route files 
const bootcamps = require('./api/bootcamps');

// logger files
const app = express();

// Body parser : 이것이 없으면 Json 형태의 req.body를 받을 수 없다.
app.use(express.json());

// Dev logging middleware 
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
// Mount apis
app.use('/api/v1/bootcamps', bootcamps);

app.use(errorHandler);

const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, () => {
  console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error : ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
})