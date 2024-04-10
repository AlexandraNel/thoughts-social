//not a model, only a schema. SUBDOC (still require schema for clarity)
//Cannot be queried directly, lives on thought model- not a model

const { Schema, Types } = require('mongoose'); //types needs to be imported for new ObjectId
const dayjs = require('dayjs'); //for date format

const reactionSchema = new Schema({
    // uses imported Types and function to ensure new ObjId for each reactionId
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280,
    },
    username: { //attribute the suer name of user 
        type: String,
        required: true,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (date) => dayjs(date).format('DD-MM-YYYY') //format on query using dayjs arrow function okay as .this absent
    }

}, {
    toJson: {
        getters: true,
    }
});

module.exports = reactionSchema;