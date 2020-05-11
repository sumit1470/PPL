const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const userdb = require('./RegisterSchema');
const router  = require('./routes');
const ejs = require('ejs');

mongoose.connect('mongodb://localhost:27017/ppl', {useNewUrlParser: true, useUnifiedTopology: true});
const app = express();

//set view engine
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
app.use('/', router);
app.use(express.static(__dirname+"/Uploads"));


app.listen(3002,()=>{
    console.log('server running');
})