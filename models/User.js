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
    }
});

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
        type: Number,
        required: true
    }, 
    tasks: [TaskSchema]
});

const UserSchema = new Schema({
    email: {
        type: String,
        required: True
    }, 
    firstName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    projects: [ProjectSchema]
});

module.exports = mongoose.model('User', UserSchema);