const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const blogRoute = require('./route/blog');
const authRoute = require('./route/auth');
const port = process.env.PORT;

const app = express();

//connection to mongodb

mongoose.connect(process.env.DATABASE, {
}).then(() => {
    console.log('DB Connected');
}).catch((e) => {
    console.error(e.message);
});


//Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

//Routes
app.use('/api', blogRoute);
app.use('/api', authRoute);



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
