//require mongoose and applicable schema
const { Schema, model } = require('mongoose');

const userSchema = new Schema({

    username: {
        type: String,
        unique: true,
        trim: true
    },
    //  match uses a regex to verify the email address
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please use a valid email']
    },
    // storing as an array of _id values with ref to schema
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'thoughts'
    }],
    // storing as an array of _id values with SELF ref to USER schema
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }]
}, {
    // establishing use of virtuals for comment count, removing id for each retrieved doc as default
    toJSON: {
        virtuals: true,
    },

});

//create virtual for friend count
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = model('user', userSchema);
module.exports = User;