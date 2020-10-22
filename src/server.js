const path = require('path');
const express = require("express");
const dotenv = require("dotenv");
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const colors = require('colors');
const fileUpload = require('express-fileupload');
const errorHandler = require('./middleware/error');
const connectDB = require('../config/db');

dotenv.config({ path: './config/config.env' });

// Connect to database
connectDB();

// Route files 
const bootcamps = require('./api/bootcamps');
const courses = require('./api/courses');
const auth = require('./api/auth');

// logger files
const app = express();

// Body parser : 이것이 없으면 Json 형태의 req.body를 받을 수 없다.
app.use(express.json());

// cookie
app.use(cookieParser());

// Dev logging middleware 
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// File uploading
app.use(fileUpload());

// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Set static folder
app.use(express.static(path.join(__dirname, '/src/public')));


// Mount apis
app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/courses', courses);
app.use('/api/v1/auth', auth);

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