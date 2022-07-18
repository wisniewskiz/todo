const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

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
        type: String,
        required: true
    }, 
    tasks: [TaskSchema]
});

const UserSchema = new Schema({
    email: {
        type: String,
        required: true
    }, 
    name: {
        type: String,
        required: true
    },
    projects: [ProjectSchema]
});

UserSchema.plugin(passportLocalMongoose, {
    usernameField: 'email'
});

module.exports = mongoose.model('User', UserSchema);