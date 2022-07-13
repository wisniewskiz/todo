//IMPORTING REQUIRED PACKAGES
const express = require('express');
const mongoose = require('mongoose');

const app = express();

//SETTING UP MONGOOSE AND MONGODB
mongoose.connect("mongodb://localhost:27017/todo", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection.on("error", console.error.bind(console, "Connection error"));
mongoose.connection.once("open", () => {
    console.log("Database connected!");
})

//ROUTES
app.get('/', (req, res) => {
    res.send('<h1>HELLO WORLD</h1>')
})


//STARTING SERVER
app.listen(8080, () => {
    console.log('Server listening on port 8080');
});