let mongoose = require('mongoose');

let BoardSchema = new mongoose.Schema({
        category: String,
        name: String,
        size: Number,
        follow: Number
    },
    { collection: 'board' });

module.exports = mongoose.model('board', BoardSchema);
