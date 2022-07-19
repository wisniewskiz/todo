const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
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
    dueBy: {
        type: String,
        required: true
    }, 
    tasks: {
        type: Schema.Types.ObjectId,
        ref: "Task"
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

module.exports = mongoose.model('Project', ProjectSchema);