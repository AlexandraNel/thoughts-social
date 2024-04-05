const { Schema, model } = require('mongoose');
const UserSchema = require('./User');
// const ThoughtsSchema = require('./Thoughts');

const friendsSchema = new Schema({

});

const Friends = model('friends', friendsSchema);
module.exports = Friends;