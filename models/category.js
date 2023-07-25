const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    category: {
        type: String,
        require: true
    }
}, {timestamps: true});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;