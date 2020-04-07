const express = require('express');
const mongoose = require('mongoose');
var bodyparser = require('body-parser');

const router = require('./routes');
const cors = require('cors');
const app = express();


app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors());

// app.use('/images', express.static('./Images/'));

// superAdminConfig.superAdminCreate();

mongoose.connect('mongodb://localhost:27017/CrudDb', {
    useCreateIndex: true,
    useNewUrlParser: true
});

app.listen(3000, () => {
    console.log("----->localhost running on port 3000--");
    app.use(router);
});