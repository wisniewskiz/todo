const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    inProgress: {
        type: Boolean
    },
    timeElapsed: {
        type: Number
    },
    isComplete: {
        type: Boolean
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

module.exports = mongoose.model('User', UserSchema);