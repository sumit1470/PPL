const mongoose = require('mongoose');

const schema = mongoose.Schema({
    username: String,
    password: String,
    email: String,
    firstname: String,
    lastname: String,
    verified: {type: Boolean, default: false}
},{verionKey: false});

module.exports = mongoose.model('pplUser', schema);