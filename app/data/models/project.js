const mongoose = require('mongoose')
const schemaBase = require('./schema-base')
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required."]
    },
    user: {
        required: [true, "You should specify user id."],
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    tasks: [{
        type: Schema.Types.ObjectId,
        ref: 'tasks'
    }],
    ... schemaBase
});

var model = mongoose.model('projects', ProjectSchema);
module.exports = model;