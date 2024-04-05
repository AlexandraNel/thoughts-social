const { Schema, model } = require('mongoose');
const FriendsSchema = require('./Friends');
const ThoughtsSchema = require('./Thoughts');

const userSchema = new Schema({

});

const User = model('user', userSchema);
module.exports = User;