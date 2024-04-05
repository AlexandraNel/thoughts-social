const { Schema, model } = require('mongoose');
const UserSchema = require('./User');
const FriendsSchema = require('./Friends');

const thoughtsSchema = new Schema({

});

const Thoughts = model('thoughts', thoughtsSchema);
module.exports = Thoughts;