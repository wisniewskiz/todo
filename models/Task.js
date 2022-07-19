const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    title: {
        type: String,
        required: true
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
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: "Project"
    }
});

module.exports = mongoose.model('Task', TaskSchema);