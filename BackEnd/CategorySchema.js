const mongoose = require('mongoose');

const schema = mongoose.Schema({
    categoryName: String,
    categoryImage: String
},{versionKey: false});

module.exports = mongoose.model('pplcategory', schema);