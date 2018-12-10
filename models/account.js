let mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
    name: String,
    email: {type: String},
    password: String,
    introduction: {type: String, default: ''},
    avatar: {type: String, default: ''}            //头像
},
{collection: 'account'});

module.exports = mongoose.model('user', UserSchema);