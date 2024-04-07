const { Schema, model } = require('mongoose');
const dayjs = require('dayjs'); //bringing in dayjs library for date formatting)
const reactionSchema = require('./Reaction');

const thoughtsSchema = new Schema({

    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (date) => dayjs(date).format('DD-MM-YYY HH:mm:ss') //format using dayjs 
    },
    //reference the id of the user who created it, and utilise .populate within controllers for string
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    reactions: [reactionSchema],
},
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },

    });

//create a virtual for reaction count, arrow functio omitted for use with .this
thoughtsSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thoughts = model('thoughts', thoughtsSchema);
module.exports = Thoughts;