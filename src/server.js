const express = require("express");
const dotenv = require("dotenv");

dotenv.config({ path: './config/config.env' });

// Route files 
const bootcamps = require('./api/bootcamps');

const app = express();

// Mount apis
app.use('/api/v1/bootcamps', bootcamps);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});