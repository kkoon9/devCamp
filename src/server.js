const express = require("express");
const dotenv = require("dotenv");

dotenv.config({ path: './config/config.env' });

// Route files 
const bootcamps = require('./api/bootcamps');
const morgan = require("morgan");

// logger files
const app = express();

// Dev logging middleware 
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
// Mount apis
app.use('/api/v1/bootcamps', bootcamps);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});