const dotenv = require('dotenv').config({path: __dirname+'/../.env'});
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const MERNDB_URI = process.env.MERNDB_URI;
const mongoose = require('mongoose');
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(MERNDB_URI), {useNewUrlParser: true}, { useUnifiedTopology: true};
const connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'connection error:'));

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});