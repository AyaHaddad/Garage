require ('./config/DBconfig');
const express = require('express');
const {app} = require('./config/routes');


//import { db } from './dbConfig.js';

const PORT = 3000;


//start Express 
app.listen(PORT, ()=> {
    console.log('server running on port 3000')
})

