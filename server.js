const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');
const app = express();
const route = require('./route/records');

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

// Dev logging middleware
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));

//need routes
app.use('/api/v1/', route);

module.exports = app;
