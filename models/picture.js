let mongoose = require('mongoose');

let PictureSchema = new mongoose.Schema({
    name: String,
    contentTitle: {type: String, default: ''},
    content: {type: String, default: ''},
    date: Date,
    comment: [],
    url: String,
    userid: {type: mongoose.Schema.ObjectId, ref: 'account'},
    upvote: Number
},
{collection: 'pictures'});


module.exports = mongoose.model('picture', PictureSchema);
