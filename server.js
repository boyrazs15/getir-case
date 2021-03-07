const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const app = express();
const recordController = require('./controller/recordController');

// Load env vars
dotenv.config({ path: './config/.env' });

// Connect to database
connectDB();

const PORT = process.env.PORT || 5000;
const server = app.listen(
    PORT, 
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

//Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    //Close server & exit process
    server.close(()=> process.exit(1));
});

app.use(express.json()); 

app.use(
  express.urlencoded({
    extended: false
  })
);

const route = require('./route/records');
//need another routes
app.use('/records', route);

module.exports = app;
