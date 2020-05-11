const mongoose = require('mongoose');
const schema = mongoose.Schema({
    username: String,
    category: String,
    description: String,
    image: String,
    date: String,
    time: String,
    likes: Array,
    comments: Array
});

module.exports = mongoose.model('pplposts',schema);