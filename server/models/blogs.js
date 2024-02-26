//Schema Title, content, author, slug(url), datetime

const mongoose = require('mongoose');
const { title } = require('process');

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: {},
        required: true
    },
    author: {
        type: String,
        default: "Admin"
    },
    slug: {
        type: String,
        lowercase: true,
        unique: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);

