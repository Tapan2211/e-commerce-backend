const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");

const createNewReg = require('./routes/auth.route');
const cities = require('./routes/cities.route');
const category = require('./routes/categories.route');
const product = require('./routes/product.route');

const app = express();

// Serve static files from the "uploads" directory
app.use('/uploads', express.static('uploads'));

// Enable CORS
app.use(cors());
app.options("*", cors());

const PORT = 8081;
const DB_URI = 'mongodb://localhost:27017/test';

mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to DB", DB_URI))
    .catch((err) => console.error("Failed to connect to DB", err));

app.use(express.json());

app.use('/user', createNewReg);
app.use('/cities', cities);
app.use('/categories', category);
app.use('/product', product);

app.listen(PORT, (error) => {
    if (!error) {
        console.log(`Server is running on port ${PORT}`);
    } else {
        console.log(`Error occurred, server can't start ${error}`);
    }
});
